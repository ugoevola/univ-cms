import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from '../pages/home/home.page';
import { CmsCommonModule } from '../common/cms-common.module';
import { EnsureUserAuthGuard } from '../common/guards/auth.guards';
import { UserResolve } from '../common/resolvers/user.resolve';

const homeRouter: Routes = [
  { path: 'home', component: HomePage, canActivate : [EnsureUserAuthGuard], resolve : { user : UserResolve}},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    RouterModule.forRoot(homeRouter, { useHash: true }),
    CmsCommonModule
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule { }
