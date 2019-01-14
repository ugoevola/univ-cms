import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { Form } from '@shared/interface/form.int';

@Component({
  selector: 'univ-form-loader',
  templateUrl: './form-loader.component.html'
})
export class UnivFormLoader implements OnInit {

  formGroup: FormGroup;

  @Input()
  form: Form;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initFormControls();
  }

  private initFormControls() {
    this.formGroup = this.fb.group({});
    if (this.form.items) {
      this.addFormControls(this.form.items);
    }
  }

  private addFormControls(items) {
    items.forEach((item: any) => {
      if (item.type !== 'container') {
        this.formGroup.addControl(item.bindings.name, new FormControl(null, this.getValidators(item.validations)));
      } else if (item.children) {
        this.addFormControls(item.children);
      }
    });
  }

  private getValidators(validations) {
    const validators = [];

    validations.forEach((validation) => {
      switch (validation.name) {
        case 'required':
          if (validation.param) {
            validators.push(Validators.required);
          }
          break;
        case 'minLength':
          validators.push(Validators.minLength(validation.param));
          break;
        case 'maxLength':
          validators.push(Validators.maxLength(validation.param));
          break;
      }
    });

    return validators;
  }

  submit() {}
}
