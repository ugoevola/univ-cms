import { Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Content } from '@shared/interface/content.int';
import { AsiDialogService } from '@asi-ngtools/lib';
import { NewContentModal } from './new/new-content.modal';
import { ContentWebService } from '@rest/content.webservice';
import { UcmsNotificationService } from '../../../common/ngtools/notification/notification.service';

import * as lodash from 'lodash';
import { ConfirmModal } from '../../../common/components/dialogs/confirm/confirm.modal';

@Component({
  selector: 'content-list',
  templateUrl: './content-list.page.html'
})
export class ContentListPage implements OnInit {

  @HostBinding('class') class = 'flex-column';

  @ViewChild('child2') myChild2;

  contents: Array<Content>;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private asiDialogService: AsiDialogService,
    private contentWebService: ContentWebService,
    private notificationService: UcmsNotificationService) {
    this.route.data.subscribe(() => {
      this.contents = this.route.snapshot.data.contents;
    });
  }

  ngOnInit() {
  }

  showNewContentModel() {
    const asiDialog = this.asiDialogService.fromComponent(NewContentModal, null);
    asiDialog.onDialogClose().subscribe((newContent) => {
      this.contentWebService.create(newContent).subscribe((content) => {
        this.contents.push(content);
        this.notificationService.showSuccess('page.content.notifications.create-success');
      });
    });
  }

  goToContentManager(content: Content) {
    this.router.navigate(['/app/content/manager', content.reference]);
  }

  deleteContent(contentToDelete: Content) {
    const asiDialog = this.asiDialogService.fromComponent(ConfirmModal, null);
    asiDialog.getComponent().message = 'page.content.modal.confirm-delete';

    asiDialog.onDialogClose().subscribe(() => {
      this.contentWebService.delete(contentToDelete.reference).subscribe(() => {
        this.notificationService.showSuccess('page.content.notifications.delete-success');
        lodash.remove(this.contents, (content) => {
          return content.reference === contentToDelete.reference;
        });
      }, () => {
        this.notificationService.showError('page.content.notifications.delete-fail');
      });
    });
  }
}
