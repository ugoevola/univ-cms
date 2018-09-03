import { Injectable, HttpStatus } from '@nestjs/common';
import { BaseService } from './base.service';
import * as shortid from 'shortid';
import { ContentEntity } from '@repository/schema/content.entity';
import { ContentMongoRepository } from '@repository/repositories/content.repository';
import { FunctionalException } from '@common/exception/functional.exception';
import { UnivCache } from '@common/cache.storage';

@Injectable()
export class ContentService extends BaseService<ContentEntity> {

  constructor(readonly contentRepository: ContentMongoRepository,
    readonly univCache: UnivCache) {
    super(contentRepository.getBaseRepository());
  }

  async create(content: ContentEntity) {
    const existingContent = await this.contentRepository.getBaseRepository().findOne({ name: content.name });
    if (existingContent) {
      throw new FunctionalException('already_exist',
        `A content with the same name already exist :  ${existingContent.name}`, HttpStatus.CONFLICT);
    }
    content.reference = shortid.generate();
    return super.create(content);
  }

  async update(reference: string, entity: ContentEntity): Promise<ContentEntity> {
    const content = await super.update(reference, entity);
    this.univCache.remove('content/' + content.reference);
    return content;
  }
}
