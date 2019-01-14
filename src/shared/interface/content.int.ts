import { ContentType } from '../enum/content-type.enum';
import { ContentData } from '@shared/interface/content-data.int';
import { Form } from '@shared/interface/form.int';

export class Content {
  reference?: string;
  name: string;
  description: string;
  type: ContentType;
  content?: string;
  data?: ContentData;
  form?: Form;
  createdOn?: Date;
  updatedOn?: Date;
}
