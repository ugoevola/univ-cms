import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PageEntity } from '../schema/page.entity';

@Injectable()
export class PageMongoRepository {

  constructor(@InjectRepository(PageEntity)
  private readonly pageRepository: Repository<PageEntity>) {
  }

  public getBaseRepository() {
    return this.pageRepository;
  }
}
