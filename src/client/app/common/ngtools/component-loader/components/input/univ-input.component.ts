import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'univ-input',
  templateUrl: './univ-input.component.html',
})
export class UnivInputComponent {

  @Input()
  labelPosition = 'left';

  @Input()
  formControlName = '';

  @Input()
  group: FormGroup;

  @Input()
  id: string;

  @Input()
  name: string;

  @Input()
  label: string;

  constructor() {
  }
}
