import { PageController } from './page.controller';
import { HomeController } from './home.controller';
import { Module } from '@nestjs/common';
import { ServiceModule } from '@services/service.module';
import { ContentController } from './content.controller';
import { CommonModule } from '@common/common.module';
import { RenderController } from './render.controller';
import { RequestController } from './request.controller';

@Module({
  imports: [ServiceModule, CommonModule],
  controllers: [PageController, ContentController, HomeController, RenderController, RequestController],
  exports : [ServiceModule],
})
export class RoutesModule {}
