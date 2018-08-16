import { NgModule } from '@angular/core';
import { RestModule } from './rest/rest.module';
import { NgToolsModule } from './ngtools/ngtools.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserStore } from './store/user.store';
import { EnsureUserAuthGuard } from './guards/auth.guards';
import { UserResolve } from './resolvers/user.resolve';
import { CommonModule } from '@angular/common';
import { UniversalService } from './universal/universal.service';

@NgModule({
  imports: [
    CommonModule,
    RestModule,
    NgToolsModule,
    FlexLayoutModule
  ],
  exports: [
    CommonModule,
    RestModule,
    NgToolsModule,
    FlexLayoutModule
  ],
  providers: [UserStore, EnsureUserAuthGuard, UserResolve, UniversalService]
})
export class CmsCommonModule {

}
