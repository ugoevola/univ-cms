import { IMongoModel } from './mongo-base.schema';
import { Column, Entity, ObjectID, ObjectIdColumn, Index, PrimaryColumn } from 'typeorm';

export interface IPage extends IMongoModel {
  name: string;
}

@Entity()
export class PageEntity implements IPage {

  @ObjectIdColumn()
  _id?: ObjectID;

  @PrimaryColumn()
  reference?: string;

  @Column()
  @Index({ unique: true })
  name: string;

  @Column()
  createdOn?: Date;

  @Column()
  updatedOn?: Date;
}
