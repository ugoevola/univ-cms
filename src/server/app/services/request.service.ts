import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { BaseService } from './base.service';
import * as shortid from 'shortid';
import { RequestEntity } from '@repository/schema/request.entity';
import { RequestMongoRepository } from '@repository/repositories/request.repository';
import { FunctionalException } from '@common/exception/functional.exception';

@Injectable()
export class RequestService extends BaseService<RequestEntity> {

  constructor(readonly requestRepository: RequestMongoRepository) {
    super(requestRepository.getBaseRepository());
  }

  async create(request: RequestEntity) {
    const existingRequest = await this.requestRepository.getBaseRepository().findOne({ name: request.name });
    if (existingRequest) {
      throw new FunctionalException('already_exist',
        `A request with the same name already exist :  ${existingRequest.name}`, HttpStatus.CONFLICT);
    }
    request.reference = shortid.generate();
    return super.create(request);
  }

  async update(reference: string, request: RequestEntity) {
    const exist = await super.exist(reference);
    if (!exist) {
      throw new NotFoundException(`No request with reference ${reference} found`);
    }
    return await super.update(reference, request);
  }
}
