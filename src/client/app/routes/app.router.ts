import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from '../pages/home/home.page';
import { CmsCommonModule } from '../common/cms-common.module';
import { EnsureUserAuthGuard } from '../common/guards/auth.guards';
import { UserResolve } from '../common/resolvers/user.resolve';
import { HeaderComponent } from '../pages/header/header.component';
import { MenuComponent } from '../pages/menu/menu.component';
import { AppPage } from '../pages/app.page.';
import { TemplateManagerComponent } from '../pages/manager/templates/template-manager.component';
import { FormManagerComponent } from '../pages/manager/forms/form-manager.component';
import { ContentManagerComponent } from '../pages/manager/content-manager.page';

const appRouter: Routes = [
  {
    path: 'app', component: AppPage, canActivate: [EnsureUserAuthGuard], resolve: { user: UserResolve },
    children: [
      { path: 'home', component: HomePage },
      { path: 'content-manager', component: ContentManagerComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'app', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppPage,
    HomePage,
    HeaderComponent,
    MenuComponent,
    ContentManagerComponent,
    TemplateManagerComponent,
    FormManagerComponent
  ],
  imports: [
    RouterModule.forRoot(appRouter, { useHash: true }),
    CmsCommonModule
  ],
  exports: [
    RouterModule,
    HeaderComponent
  ]
})
export class AppRoutingModule { }
