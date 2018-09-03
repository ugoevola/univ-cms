import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Content } from '@shared/interface/content.int';
import { ContentWebService } from '@rest/content.webservice';
import { UcmsNotificationService } from '../../../common/ngtools/notification/notification.service';

@Component({
  selector: 'content-manager',
  templateUrl: './content-manager.page.html'
})
export class ContentManagerPage implements OnInit {

  @HostBinding('class') class = 'flex-column';

  content: Content;
  requests: Array<Request>;

  constructor(private route: ActivatedRoute,
    private contentWebService: ContentWebService,
    private notificationService: UcmsNotificationService) {
    this.route.data.subscribe(() => {
      this.content = this.route.snapshot.data.content;
      this.requests = this.route.snapshot.data.requests || [];
    });
  }

  ngOnInit() {}

  saveContent() {
    this.contentWebService.update(this.content).subscribe((content) => {
      this.content = content;
      this.notificationService.showSuccess('page.content.notifications.update-success');
    });
  }
}
