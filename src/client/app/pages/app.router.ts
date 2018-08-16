import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from '../pages/home/home.page';
import { CmsCommonModule } from '../common/cms-common.module';
import { EnsureUserAuthGuard } from '../common/guards/auth.guards';
import { UserResolve } from '../common/resolvers/user.resolve';
import { HeaderComponent } from '../pages/header/header.component';
import { MenuComponent } from '../pages/menu/menu.component';
import { AppPage } from '../pages/app.page.';
import { TemplateManagerComponent } from './content/manager/templates/template-manager.component';
import { ContentPage } from './content/content.page';
import { ContentListPage } from './content/list/content-list.page';
import { ContentManagerPage } from './content/manager/content-manager.page';
import { FormManagerComponent } from './content/manager/forms/form-manager.component';
import { ContentsListResolver } from './content/list/content-list.resolver';

const appRouter: Routes = [
  {
    path: 'app', component: AppPage, canActivate: [EnsureUserAuthGuard], resolve: { user: UserResolve },
    children: [
      { path: 'home', component: HomePage },
      {
        path: 'content', component: ContentPage, children: [
          { path: 'list', component: ContentListPage, resolve: { contents: ContentsListResolver } },
          { path: 'manager', component: ContentManagerPage },
          { path: '', redirectTo: 'list', pathMatch: 'full' }
        ]
      },
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
    ContentListPage,
    ContentManagerPage,
    ContentPage,
    FormManagerComponent,
    TemplateManagerComponent,
  ],
  imports: [
    RouterModule.forRoot(appRouter),
    CmsCommonModule
  ],
  exports: [
    RouterModule,
    HeaderComponent,
  ],
  providers: [
    ContentsListResolver
  ]
})
export class AppRoutingModule { }
