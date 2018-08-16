// GitHub source: src/app/app.server.module.ts
import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { RootModule } from './root.module';
import { RootComponent } from './root.component';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

@NgModule({
  imports: [
    RootModule,
    ServerModule,
    ServerTransferStateModule,
    ModuleMapLoaderModule,
    FlexLayoutServerModule,
  ],
  bootstrap: [RootComponent],
})
export class RootServerModule {
}
