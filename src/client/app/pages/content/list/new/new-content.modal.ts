import { AsiDialogView } from '@asi-ngtools/lib';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContentType } from '@shared/enum/content-type.enum';
import { Content } from '@shared/interface/content.int';

@Component({
  selector: 'new-content-modal',
  templateUrl: './new-content.modal.html',
})
export class NewContentModal extends AsiDialogView implements OnInit {

  contentTypes = Object.keys(ContentType);
  newContentForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.newContentForm = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      type: [null, Validators.required],
    });
  }

  createContent() {
    if (this.newContentForm.valid) {

      const content = new Content();
      content.name = this.newContentForm.controls.name.value;
      content.description = this.newContentForm.controls.description.value;
      content.type = this.newContentForm.controls.type.value;

      this.dialog.close(content);
    }
  }
}
