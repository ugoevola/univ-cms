import { IMongoModel } from './mongo-base.schema';
import { Column, Entity, ObjectID, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import { ContentType } from '@shared/enum/content-type.enum';
import { ContentData } from '@shared/interface/content-data.int';

@Entity()
export class ContentEntity implements IMongoModel {

  @ObjectIdColumn()
  _id?: ObjectID;

  @PrimaryColumn()
  reference?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  type: ContentType;

  @Column()
  content?: string;

  @Column()
  data?: ContentData;

  @Column()
  createdOn?: Date;

  @Column()
  updatedOn?: Date;
}
