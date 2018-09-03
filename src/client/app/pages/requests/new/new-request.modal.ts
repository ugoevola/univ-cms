import { AsiDialogView } from '@asi-ngtools/lib';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Request } from '@shared/interface/request.int';

@Component({
  selector: 'new-request-modal',
  templateUrl: './new-request.modal.html',
})
export class NewRequestModal extends AsiDialogView implements OnInit {

  newRequestForm: FormGroup;
  methods = ['GET', 'POST'];
  request: Request;

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    if (this.request) {
      this.newRequestForm = this.formBuilder.group({
        name: [this.request.name, Validators.required],
        method: [this.request.method, Validators.required],
        url: [this.request.url, Validators.required],
        body: [this.request.body],
      });
    } else {
      this.newRequestForm = this.formBuilder.group({
        name: [null, Validators.required],
        method: [null, Validators.required],
        url: [null, Validators.required],
        body: [null],
      });
    }
  }

  isMethodPost() {
    return this.newRequestForm.controls.method.value === 'POST';
  }

  createRequest() {
    if (this.newRequestForm.valid) {

      const request = this.request || new Request();
      request.name = this.newRequestForm.controls.name.value;
      request.method = this.newRequestForm.controls.method.value;
      request.url = this.newRequestForm.controls.url.value;
      request.body = this.newRequestForm.controls.body.value;

      this.dialog.close(request);
    }
  }
}
