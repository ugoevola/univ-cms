import { Module } from '@nestjs/common';
import { PageMongoRepository } from './repositories/page.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageEntity } from '@repository/schema/page.entity';
import { ContentEntity } from '@repository/schema/content.entity';
import { ContentMongoRepository } from '@repository/repositories/content.repository';
import { CommonModule } from '@common/common.module';
import { RequestEntity } from '@repository/schema/request.entity';
import { RequestMongoRepository } from '@repository/repositories/request.repository';

const repositories  = [
  PageMongoRepository,
  ContentMongoRepository,
  RequestMongoRepository,
];

@Module({
  imports: [TypeOrmModule.forFeature([PageEntity, ContentEntity, RequestEntity]), CommonModule],
  controllers: [],
  providers: [...repositories],
  exports : [...repositories],
})
export class RepositoryModule {
}
