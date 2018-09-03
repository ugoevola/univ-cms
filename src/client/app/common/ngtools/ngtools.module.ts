

import { NgModule } from '@angular/core';
import {
  AsiInputModule, AsiTextareaModule, AsiButtonModule,
  AsiSelectModule, AsiAutoCompleteModule,
  AsiCheckBoxModule,
  AsiNotificationModule,
  AsiInputIconModule,
  AsiErrorMessagesModule,
  AsiServicesModule,
  AsiMenuModule,
  AsiRadioGroupModule,
  AsiFaIconModule,
  AsiDialogModule,
  AsiTabGroupModule,
  AsiTableModule,
  AsiPipesModule
} from '@asi-ngtools/lib';
import { NotificationComponent } from './notification/notification.component';
import { UcmsNotificationService } from './notification/notification.service';
import { AsiList } from './asi-list/asi-list.component';
import { AsiComponentTemplateListItemDef, AsiListItemTemplate } from './asi-list/asi-list-item.component';
import { AsiPanel } from './asi-panel/asi-panel.component';

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
  AsiServicesModule,
  AsiRadioGroupModule,
  AsiFaIconModule,
  AsiMenuModule,
  AsiDialogModule,
  AsiTabGroupModule,
  AsiTableModule,
  AsiPipesModule
];

@NgModule({
  declarations: [NotificationComponent,
    AsiList,
    AsiListItemTemplate,
    AsiComponentTemplateListItemDef,
    AsiPanel],
  imports: [modules],
  exports: [modules,  AsiList, AsiListItemTemplate, AsiComponentTemplateListItemDef, AsiPanel],
  entryComponents : [NotificationComponent],
  providers: [UcmsNotificationService]
})
export class NgToolsModule {
}
