

import { Component, Input } from '@angular/core';

@Component({
  selector: 'univ-select',
  templateUrl: './univ-select.component.html',
})
export class UnivSelectComponent {

  @Input()
  id: string;

  @Input()
  name: string;

  @Input()
  label: string;

  @Input()
  formControlName: string;

  @Input()
  data: Array<any>;

  @Input()
  multiple: boolean;

  constructor() {
  }
}
