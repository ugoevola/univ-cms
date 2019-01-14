

import { NgModule } from '@angular/core';
import {
  AsiInputModule, AsiTextareaModule, AsiDatePickerModule, AsiButtonModule, AsiSelectModule, AsiAutoCompleteModule,
  AsiCheckBoxModule, AsiInputIconModule, AsiErrorMessagesModule, AsiServicesModule, AsiRadioGroupModule,
  AsiFaIconModule, AsiDialogModule, AsiTableModule, AsiPipesModule,
} from '@asi-ngtools/lib';
import { UnivInputComponent } from './component-loader/components/input/univ-input.component';
import { UnivSelectComponent } from './component-loader/components/select/univ-select.component';
import { UnivDatepickerComponent } from './component-loader/components/datepicker/univ-datepicker.component';
import { UnivAutocompleteComponent } from './component-loader/components/autocomplete/univ-autocomplete.component';
import { UnivComponentLoader } from './component-loader/univ-component-loader.directive';
import { UnivComponentLoaderService } from './component-loader/univ-component-loader.service';

const modules = [
  AsiInputModule,
  AsiTextareaModule,
  AsiDatePickerModule,
  AsiButtonModule,
  AsiSelectModule,
  AsiAutoCompleteModule,
  AsiCheckBoxModule,
  AsiInputIconModule,
  AsiErrorMessagesModule,
  AsiServicesModule,
  AsiRadioGroupModule,
  AsiFaIconModule,
  AsiDialogModule,
  AsiPipesModule,
  AsiTableModule,
];

@NgModule({
  declarations: [UnivInputComponent,
    UnivSelectComponent,
    UnivDatepickerComponent,
    UnivAutocompleteComponent,
    UnivComponentLoader],
  imports: [...modules],
  exports: [...modules, UnivComponentLoader],
  entryComponents: [UnivInputComponent,
    UnivSelectComponent,
    UnivDatepickerComponent,
    UnivAutocompleteComponent],
  providers: [UnivComponentLoaderService]
})
export class NgToolsModule {
}
