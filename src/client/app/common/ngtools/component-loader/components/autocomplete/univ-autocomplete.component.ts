import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'univ-autocomplete',
  templateUrl: './univ-autocomplete.component.html',
})
export class UnivAutocompleteComponent {

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
  data: Array<any>;

  @Input()
  requestData: Function;

  constructor() {
  }
}
