import { ObjectID, ObjectLiteral, DeepPartial } from 'typeorm';

export interface IMongoModel extends ObjectLiteral, DeepPartial<any> {
  _id?: ObjectID;
  reference?: string;
  createdOn?: Date;
  updatedOn?: Date;
}
