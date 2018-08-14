import { Module } from '@nestjs/common';
import { PageMongoRepository } from './repositories/page.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageEntity } from '@repository/schema/page.entity';
import { ContentEntity } from '@repository/schema/content.entity';
import { ContentMongoRepository } from '@repository/repositories/content.repository';

const repositories  = [
  PageMongoRepository,
  ContentMongoRepository
];

@Module({
  imports: [TypeOrmModule.forFeature([PageEntity, ContentEntity])],
  controllers: [],
  providers: [...repositories],
  exports : [...repositories],
})
export class RepositoryModule {
}
