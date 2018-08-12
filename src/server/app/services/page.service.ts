import { Injectable } from '@nestjs/common';
import { PageMongoRepository } from '../repository/repositories/page.repository';
import { BaseService } from './base.service';
import { Page } from '../repository/schema/page.entity';
import { FunctionalException } from '../common/exception/functional.exception';
import * as shortid from 'shortid';

@Injectable()
export class PageService extends BaseService<Page>{

  constructor(readonly pageRepository: PageMongoRepository) {
    super(pageRepository.getBaseRepository());
  }

  async create(page: Page) {
    const existingPage = await this.pageRepository.getBaseRepository().findOne({name : page.name });
    if (existingPage) {
      throw new FunctionalException('already_exist', `A page with the same name already exist :  ${existingPage.name}`);
    }
    page.reference = shortid.generate();
    return super.create(page);
  }
}