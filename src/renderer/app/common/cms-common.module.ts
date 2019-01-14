import { NgModule } from '@angular/core';
import { RestModule } from './rest/rest.module';
import { CommonModule } from '@angular/common';
import { UniversalService } from './universal/universal.service';
import { OnBrowserSide } from './universal/on-browser-side.pipe';
import { NgToolsModule } from './ngtools/ngtools.module';

const sharedItems = [ OnBrowserSide];

@NgModule({
  declarations: [
    ...sharedItems
  ],
  imports: [
    CommonModule,
    RestModule,
    NgToolsModule,
  ],
  exports: [
    CommonModule,
    RestModule,
    NgToolsModule,
    ...sharedItems
  ],
  entryComponents : [],
  providers: [UniversalService]
})
export class CmsCommonModule {

}
