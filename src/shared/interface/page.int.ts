import { Content } from './content.int';

export class Page {
  _id?: any;
  reference?: string;
  name: string;
  createdOn?: Date;
  updatedOn?: Date;
  content?: Content;
}
