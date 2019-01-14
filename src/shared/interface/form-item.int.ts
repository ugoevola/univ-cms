export class FormItem {
  type: string;
  direction?: string;
  bindings?: any;
  validations?: Array<any>;
  children?: Array<FormItem>;
}
