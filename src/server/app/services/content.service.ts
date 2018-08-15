import { Injectable, HttpStatus } from '@nestjs/common';
import { BaseService } from './base.service';
import * as shortid from 'shortid';
import { ContentEntity } from '@repository/schema/content.entity';
import { ContentMongoRepository } from '@repository/repositories/content.repository';
import { FunctionalException } from '@common/exception/functional.exception';

@Injectable()
export class ContentService extends BaseService<ContentEntity> {

  constructor(readonly contentRepository: ContentMongoRepository) {
    super(contentRepository.getBaseRepository());
  }

  async create(content: ContentEntity) {
    const existingContent = await this.contentRepository.getBaseRepository().findOne({name : content.name });
    if (existingContent) {
      throw new FunctionalException('already_exist',
        `A content with the same name already exist :  ${existingContent.name}`, HttpStatus.CONFLICT);
    }
    content.reference = shortid.generate();
    return super.create(content);
  }
}
