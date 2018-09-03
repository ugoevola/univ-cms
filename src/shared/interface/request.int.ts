export class Request {
  reference?: string;
  name: string;
  method: 'GET' | 'POST';
  url: string;
  body?: string;
  createdOn?: Date;
  updatedOn?: Date;
}
