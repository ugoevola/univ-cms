import { NgModule } from '@angular/core';
import { RestModule } from './rest/rest.module';
import { NgToolsModule } from './ngtools/ngtools.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserStore } from './store/user.store';
import { EnsureUserAuthGuard } from './guards/auth.guards';
import { UserResolve } from './resolvers/user.resolve';
import { CommonModule } from '@angular/common';
import { UniversalService } from './universal/universal.service';
import { RichTextEditorComponent } from './components/richtexteditor/richtexteditor.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { AssetsUrlPipe } from './pipes/assets-url.pipe';
import { ConfirmModal } from './components/dialogs/confirm/confirm.modal';
import { OnBrowserSide } from './universal/on-browser-side.pipe';

const sharedItems = [RichTextEditorComponent, AssetsUrlPipe, ConfirmModal, OnBrowserSide];

@NgModule({
  declarations: [
    ...sharedItems
  ],
  imports: [
    CommonModule,
    RestModule,
    NgToolsModule,
    FlexLayoutModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
  ],
  exports: [
    CommonModule,
    RestModule,
    NgToolsModule,
    FlexLayoutModule,
    FroalaEditorModule,
    FroalaViewModule,
    ...sharedItems
  ],
  entryComponents : [ConfirmModal],
  providers: [UserStore, EnsureUserAuthGuard, UserResolve, UniversalService]
})
export class CmsCommonModule {

}
