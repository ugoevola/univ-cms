import { NgModule, ErrorHandler } from '@angular/core';
import { RootComponent } from './root.component';
import { CmsCommonModule } from './common/cms-common.module';
import { CmsErrorHandler } from './common/error.handler';
import { AppRoutingModule } from './pages/app.router';

@NgModule({
  declarations: [
    RootComponent
  ],
  imports: [
    AppRoutingModule,
    CmsCommonModule
  ],
  providers: [{ provide: ErrorHandler, useClass: CmsErrorHandler }]
})
export class RootModule {
}
