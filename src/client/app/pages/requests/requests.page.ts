import { Component, HostBinding, ViewChild } from '@angular/core';
import { AsiTableRequest, AsiDialogService, AsiTableData, AsiTable } from '@asi-ngtools/lib';
import { UcmsNotificationService } from '../../common/ngtools/notification/notification.service';
import { ActivatedRoute } from '@angular/router';
import { NewRequestModal } from './new/new-request.modal';
import { RequestWebService } from '@rest/request.webservice';
import { Request } from '@shared/interface/request.int';
import { ConfirmModal } from '../../common/components/dialogs/confirm/confirm.modal';
import * as lodash from 'lodash';

@Component({
  selector: 'requests-page',
  templateUrl: './requests.page.html'
})
export class RequestsPage {

  @HostBinding('class') class = 'flex-column';

  @ViewChild(AsiTable) requestTable: AsiTable<Request>;

  requests: Array<Request> = [];

  constructor(private route: ActivatedRoute,
    private asiDialogService: AsiDialogService,
    private requestWebService: RequestWebService,
    private notificationService: UcmsNotificationService) {
    this.route.data.subscribe(() => {
      this.requests = this.route.snapshot.data.requests;
    });
  }

  showNewRequestModal() {
    const asiDialog = this.asiDialogService.fromComponent(NewRequestModal, null);
    asiDialog.onDialogClose().subscribe((newRequest) => {
      this.requestWebService.create(newRequest).subscribe((request) => {
        this.requests.push(request);
        this.requestTable.fireRefresh();
        this.notificationService.showSuccess('page.request.notifications.create-success');
      });
    });
  }

  deleteRequest(requestToDelete: Request) {
    const asiDialog = this.asiDialogService.fromComponent(ConfirmModal, null);
    asiDialog.getComponent().message = 'page.request.modal.confirm-delete';

    asiDialog.onDialogClose().subscribe(() => {
      this.requestWebService.delete(requestToDelete.reference).subscribe(() => {
        this.notificationService.showSuccess('page.request.notifications.delete-success');
        lodash.remove(this.requests, (request) => {
          return request.reference === requestToDelete.reference;
        });
        this.requestTable.fireRefresh();
      }, () => {
        this.notificationService.showError('page.request.notifications.delete-fail');
      });
    });
  }

  editRequest(request: Request) {
    const asiDialog = this.asiDialogService.fromComponent(NewRequestModal, null);
    asiDialog.getComponent().request = request;

    asiDialog.onDialogClose().subscribe((editedRequest) => {
      this.requestWebService.update(editedRequest).subscribe(() => {
        this.notificationService.showSuccess('page.request.notifications.update-success');
      }, () => {
        this.notificationService.showError('page.request.notifications.update-fail');
      });
    });
  }

  refreshTable = (_tableRequest: AsiTableRequest) => {
    const asiTableData = new AsiTableData();
    asiTableData.results = this.requests;
    asiTableData.paginate = true;
    return asiTableData;
  }
}
