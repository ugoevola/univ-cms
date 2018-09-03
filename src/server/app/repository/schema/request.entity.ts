import { IMongoModel } from './mongo-base.schema';
import { Column, Entity, ObjectID, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class RequestEntity implements IMongoModel {

  @ObjectIdColumn()
  _id?: ObjectID;

  @PrimaryColumn()
  reference?: string;

  @Column()
  name: string;

  @Column()
  method: 'GET' | 'POST';

  @Column()
  url: string;

  @Column()
  body?: string;

  @Column()
  createdOn?: Date;

  @Column()
  updatedOn?: Date;
}
