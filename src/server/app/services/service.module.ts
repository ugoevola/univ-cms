import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repository/repository.module';
import { PageService } from './page.service';
import { ContentService } from '@services/content.service';

const services = [
  PageService,
  ContentService
];

@Module({
  imports: [RepositoryModule],
  providers: [...services],
  exports : [...services, RepositoryModule],
})
export class ServiceModule {}
