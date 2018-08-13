import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import * as shortid from 'shortid';
import { ContentEntity } from '@repository/schema/content.entity';
import { ContentMongoRepository } from '@repository/repositories/content.repository';

@Injectable()
export class ContentService extends BaseService<ContentEntity> {

  constructor(readonly contentRepository: ContentMongoRepository) {
    super(contentRepository.getBaseRepository());
  }

  create(content: ContentEntity) {
    content.reference = shortid.generate();
    return super.create(content);
  }
}
