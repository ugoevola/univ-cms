

import { NgModule } from '@angular/core';
import {
  AsiInputModule, AsiTextareaModule, AsiButtonModule,
  AsiSelectModule, AsiAutoCompleteModule,
  AsiCheckBoxModule,
  AsiNotificationModule,
  AsiInputIconModule,
  AsiErrorMessagesModule,
  AsiServicesModule
} from '@asi-ngtools/lib';
import { NotificationComponent } from './notification/notification.component';
import { InexysNotificationService } from './notification/notification.service';

const modules = [
  AsiInputModule,
  AsiTextareaModule,
  AsiButtonModule,
  AsiSelectModule,
  AsiAutoCompleteModule,
  AsiCheckBoxModule,
  AsiNotificationModule,
  AsiInputIconModule,
  AsiErrorMessagesModule,
  AsiServicesModule
];

@NgModule({
  declarations: [NotificationComponent],
  imports: [modules],
  exports: [modules],
  entryComponents : [NotificationComponent],
  providers: [InexysNotificationService]
})
export class NgToolsModule {
}
