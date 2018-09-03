import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestEntity } from '@repository/schema/request.entity';

@Injectable()
export class RequestMongoRepository {

  constructor(@InjectRepository(RequestEntity)
  private readonly requestRepository: Repository<RequestEntity>) {
  }

  public getBaseRepository() {
    return this.requestRepository;
  }
}
