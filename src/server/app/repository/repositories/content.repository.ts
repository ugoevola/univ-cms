import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ContentEntity } from '@repository/schema/content.entity';

@Injectable()
export class ContentMongoRepository {

  constructor(@InjectRepository(ContentEntity)
  private readonly contentRepository: Repository<ContentEntity>) {
  }

  public getBaseRepository() {
    return this.contentRepository;
  }
}
