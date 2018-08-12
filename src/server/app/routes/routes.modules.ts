import { PageController } from './page.controller';
import { HomeController } from './home.controller';
import { Module } from '@nestjs/common';
import { ServiceModule } from '@services/service.module';

@Module({
  imports: [ServiceModule],
  controllers: [PageController, HomeController],
  exports : [ServiceModule],
})
export class RoutesModule {}
