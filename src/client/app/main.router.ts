import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { CmsCommonModule } from './common/cms-common.module';

const mainRouter: Routes = [
  { path: 'login', component: LoginPage },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    LoginPage
  ],
  imports: [
    RouterModule.forRoot(mainRouter, { useHash: true }),
    CmsCommonModule
  ],
  exports: [
    RouterModule
  ]
})
export class MainRoutingModule { }
