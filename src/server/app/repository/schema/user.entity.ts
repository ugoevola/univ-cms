import { IMongoModel } from './mongo-base.schema';
import { Role } from '../enum/role.enum';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export interface IUser extends IMongoModel {
  email: string;
  password: string;
  role: Role;
  name: string;
  lastLoginAttempt?: Date;
  lastLoginSuccessful?: Date;
  createdOn?: Date;
  updatedOn?: Date;
}

@Entity()
export class UserEnity implements IUser {

  @PrimaryGeneratedColumn()
  _id;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: Role;

  @Column()
  name: string;

  @Column()
  lastLoginAttempt?: Date;

  @Column()
  lastLoginSuccessful?: Date;

  @Column()
  createdOn?: Date;

  @Column()
  updatedOn?: Date;
}
