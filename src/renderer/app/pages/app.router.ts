import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { CmsCommonModule } from '../common/cms-common.module';
import { AppPage } from './app.page';
import { UnivFormLoader } from './form-loader/form-loader.component';

const appRouter: Routes = [
  { path: 'app', component: AppPage },
  { path: '', redirectTo: 'app', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppPage,
    UnivFormLoader
  ],
  imports: [
    RouterModule.forRoot(appRouter, {
      preloadingStrategy: PreloadAllModules,
      initialNavigation: true
    }),
    CmsCommonModule
  ],
  entryComponents: [
  ],
  exports: [
    RouterModule,
  ],
  providers: []
})
export class AppRoutingModule { }
