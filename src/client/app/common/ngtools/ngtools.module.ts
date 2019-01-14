

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
  AsiPipesModule,
  AsiDatePickerModule,
} from '@asi-ngtools/lib';
import { NotificationComponent } from './notification/notification.component';
import { UcmsNotificationService } from './notification/notification.service';
import { AsiList } from './asi-list/asi-list.component';
import { AsiComponentTemplateListItemDef, AsiListItemTemplate } from './asi-list/asi-list-item.component';
import { AsiPanel } from './asi-panel/asi-panel.component';
import { UnivComponentLoader } from './component-loader/univ-component-loader.directive';
import { UnivComponentLoaderService } from './component-loader/univ-component-loader.service';
import { UnivInputComponent } from './component-loader/components/input/univ-input.component';
import { UnivSelectComponent } from './component-loader/components/select/univ-select.component';
import { UnivDatepickerComponent } from './component-loader/components/datepicker/univ-datepicker.component';
import { UnivAutocompleteComponent } from './component-loader/components/autocomplete/univ-autocomplete.component';

const modules = [
  AsiInputModule,
  AsiTextareaModule,
  AsiDatePickerModule,
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
    AsiPanel,
    UnivComponentLoader,
    UnivInputComponent,
    UnivDatepickerComponent,
    UnivSelectComponent,
    UnivAutocompleteComponent
  ],
  imports: [...modules],
  exports: [...modules, AsiList, AsiListItemTemplate, AsiComponentTemplateListItemDef, AsiPanel, UnivComponentLoader],
  entryComponents: [NotificationComponent,
    UnivInputComponent,
    UnivAutocompleteComponent,
    UnivDatepickerComponent,
    UnivSelectComponent],
  providers: [UcmsNotificationService, UnivComponentLoaderService]
})
export class NgToolsModule {
}
