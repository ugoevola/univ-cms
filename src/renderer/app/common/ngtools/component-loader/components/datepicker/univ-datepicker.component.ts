import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'univ-datepicker',
  templateUrl: './univ-datepicker.component.html',
})
export class UnivDatepickerComponent {

  @Input()
  id: string;

  @Input()
  name: string;

  @Input()
  label: string;

  @Input()
  labelPosition = 'left';

  @Input()
  formControlName = '';

  @Input()
  group: FormGroup;

  @Input()
  minDate: Date;

  @Input()
  maxDate: Date;

  constructor() {
  }
}
