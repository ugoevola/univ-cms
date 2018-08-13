import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repository/repository.module';
import { PageService } from './page.service';

const services = [
  PageService,
];

@Module({
  imports: [RepositoryModule],
  providers: [...services],
  exports : [...services, RepositoryModule],
})
export class ServiceModule {}
