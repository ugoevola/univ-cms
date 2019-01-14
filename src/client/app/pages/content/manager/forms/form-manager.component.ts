import { Component, HostBinding, OnInit, Input } from '@angular/core';
import * as lodash from 'lodash';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Content } from '@shared/interface/content.int';
import { Form } from '@shared/interface/form.int';

@Component({
  selector: 'form-manager',
  templateUrl: './form-manager.component.html'
})
export class FormManagerComponent implements OnInit {

  @HostBinding('class') class = 'flex-column';

  @Input() content: Content;

  form: Form = {
    name: 'supername',
    items: [{
      type: 'container',
      direction: 'column',
      children: [{
        type: 'input',
        bindings: {
          name: 'firstname',
          label: 'Firstname : ',
          placeholder: 'Firstname',
          maxlength: 20,
        },
        validations: [{
          type: 'require',
          param: true,
          message: 'This field is require'
        }, {
          type: 'maxLength',
          param: 15,
          message: 'max length is 15'
        }]
      },
      {
        type: 'input',
        bindings: {
          name: 'lastname',
          label: 'Lastname : ',
          placeholder: 'Lastname'
        }
      }]
    }]
  };

  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.content.form = this.form;
    this.initFormControls();
  }

  private initFormControls() {
    this.formGroup = this.fb.group({});
    if (this.form.items) {
      this.addFormControls(this.form.items);
    }
  }

  private addFormControls(items) {
    lodash.forEach(items, (item: any) => {
      if (item.type !== 'container') {
        this.formGroup.addControl(item.bindings.name, new FormControl(null, this.getValidators(item.validations)));
      } else if (item.children) {
        this.addFormControls(item.children);
      }
    });

  }
  private getValidators(validations) {
    const validators = [];

    lodash.forOwn(validations, (validatorName, param) => {
      switch (validatorName) {
        case 'required':
          if (param) {
            validators.push(Validators.required);
          }
          break;
        case 'minLength':
          validators.push(Validators.minLength);
          break;
        case 'maxLength':
          validators.push(Validators.maxLength);
          break;
      }
    });

    return validators;
  }

  submit() {

  }
}
