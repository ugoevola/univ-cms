import { Module } from '@nestjs/common';
import { PageMongoRepository } from './repositories/page.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageEntity } from '@repository/schema/page.entity';

const repositories  = [
  PageMongoRepository,
];

@Module({
  imports: [TypeOrmModule.forFeature([PageEntity])],
  controllers: [],
  providers: [...repositories],
  exports : [...repositories],
})
export class RepositoryModule {
}
