import { Repository, ObjectID } from 'typeorm';
import { TechnicalException } from '../common/exception/technical.exception';
import { IMongoModel } from '@repository/schema/mongo-base.schema';

export abstract class BaseService<E extends IMongoModel> {

  constructor(private repository: Repository<any>) { }

  async create(entity: E): Promise<E> {
    try {
      entity.createdOn = new Date();
      entity.updatedOn = new Date();
      const insertResult = await this.repository.insert(entity);
      entity._id = insertResult.raw.insertedId;
      return entity;
    } catch (err) {
      throw new TechnicalException('mongo-error', err.message);
    }
  }

  async update(reference: string, entity: E): Promise<E> {
    entity.updatedOn = new Date();
    entity.reference = reference;
    try {
      await this.repository.update(this.condition('reference', reference), entity);
    } catch (err) {
      throw new TechnicalException('mongo-error', err.message);
    }
    return entity;
  }

  async exist(reference: string) {
    const count = await this.repository.count(this.condition('reference', reference));
    return count > 0;
  }

  async delete(reference: string): Promise<boolean> {
    const result = await this.repository.delete(this.condition('reference', reference));
    return !!result;
  }

  async listAll(): Promise<Array<E>> {
    return await this.repository.find({});
  }

  findById(_id: ObjectID) {
    return this.repository.findOne({ where: { _id } });
  }

  findByReference(reference: string) {
    return this.repository.findOne({ where: { reference } });
  }

  condition(name, value) {
    const literal = {};
    literal[name] = value;
    return literal;
  }
}
