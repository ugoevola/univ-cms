import { AsiDialogView } from '@asi-ngtools/lib';
import { Component } from '@angular/core';

@Component({
  selector: 'confirm-modal',
  templateUrl: './confirm.modal.html',
})
export class ConfirmModal extends AsiDialogView {

  public header = 'Please confirm';
  public message = '';

  constructor() {
    super();
  }
}
