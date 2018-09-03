import { ContentType } from '../enum/content-type.enum';
import { ContentData } from '@shared/interface/content-data.int';

export class Content {
  reference?: string;
  name: string;
  description: string;
  type: ContentType;
  content?: string;
  data?: ContentData;
  createdOn?: Date;
  updatedOn?: Date;
}
