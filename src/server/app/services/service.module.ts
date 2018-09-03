import { Module, HttpModule } from '@nestjs/common';
import { RepositoryModule } from '../repository/repository.module';
import { PageService } from './page.service';
import { ContentService } from '@services/content.service';
import { CommonModule } from '@common/common.module';
import { ContentRendererService } from '@services/content-renderer.service';
import { RequestService } from '@services/request.service';

const services = [
  PageService,
  RequestService,
  ContentService,
  ContentRendererService
];

@Module({
  imports: [RepositoryModule, CommonModule, HttpModule],
  providers: [...services],
  exports : [...services, RepositoryModule],
})
export class ServiceModule {}
