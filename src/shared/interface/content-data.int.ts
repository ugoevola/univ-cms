import { Request } from './request.int';

export class ContentData {
  from: 'BODY' | 'URL' | 'REQUEST';
  method?: 'GET' | 'POST';
  url?: string;
  body?: string;
  fromBody?: string;
  request?: Request;
  exampleBody?: string;
}
