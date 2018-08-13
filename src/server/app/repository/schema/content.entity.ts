import { IMongoModel } from './mongo-base.schema';
import { Column, Entity, ObjectID, ObjectIdColumn, Index, PrimaryColumn } from 'typeorm';

@Entity()
export class ContentEntity implements IMongoModel {

  @ObjectIdColumn()
  _id?: ObjectID;

  @PrimaryColumn()
  reference?: string;

  @Column()
  name: string;

  @Column()
  content: string;

  @Column()
  createdOn?: Date;

  @Column()
  updatedOn?: Date;
}
