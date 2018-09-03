import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
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
import { LoginPage } from './login/login.page';
import { FootComponent } from './footer/footer.component';
import { MembersPage } from './members/members.page';
import { NewContentModal } from './content/list/new/new-content.modal';
import { ContentResolver } from './content/content.resolver';
import { ContentDataComponent } from './content/manager/data/content-data.component';
import { ContentPreviewComponent } from './content/manager/preview/content-preview.component';
import { RequestsPage } from './requests/requests.page';
import { HelpPage } from './help/help.page';
import { NewRequestModal } from './requests/new/new-request.modal';
import { RequestsResolver } from './requests/requests.resolver';

const appRouter: Routes = [
  { path: 'login', component: LoginPage },
  {
    path: 'app', component: AppPage, canActivate: [EnsureUserAuthGuard], resolve: { user: UserResolve },
    children: [
      { path: 'home', component: HomePage },
      {
        path: 'content', component: ContentPage, children: [
          { path: 'list', component: ContentListPage, resolve: { contents: ContentsListResolver } },
          { path: 'manager/:reference', component: ContentManagerPage, resolve: { content: ContentResolver, requests: RequestsResolver } },
          { path: '', redirectTo: 'list', pathMatch: 'full' }
        ]
      },
      { path: 'members', component: MembersPage },
      { path: 'requests', component: RequestsPage, resolve: { requests: RequestsResolver } },
      { path: 'help', component: HelpPage },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'app', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppPage,
    LoginPage,
    HomePage,
    HelpPage,
    RequestsPage,
    HeaderComponent,
    MenuComponent,
    ContentListPage,
    ContentManagerPage,
    ContentDataComponent,
    ContentPage,
    FormManagerComponent,
    TemplateManagerComponent,
    FootComponent,
    MembersPage,
    NewContentModal,
    NewRequestModal,
    ContentPreviewComponent
  ],
  imports: [
    RouterModule.forRoot(appRouter, {
      preloadingStrategy: PreloadAllModules,
      initialNavigation: true
    }),
    CmsCommonModule
  ],
  entryComponents: [
    NewContentModal,
    NewRequestModal
  ],
  exports: [
    RouterModule,
    HeaderComponent,
  ],
  providers: [
    ContentsListResolver,
    ContentResolver,
    RequestsResolver
  ]
})
export class AppRoutingModule { }
