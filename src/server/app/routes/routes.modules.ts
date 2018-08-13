import { PageController } from './page.controller';
import { HomeController } from './home.controller';
import { Module } from '@nestjs/common';
import { ServiceModule } from '@services/service.module';
import { ContentController } from './content.controller';

@Module({
  imports: [ServiceModule],
  controllers: [PageController, ContentController, HomeController],
  exports : [ServiceModule],
})
export class RoutesModule {}
