import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as lodash from 'lodash';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Content } from '@shared/interface/content.int';

@Component({
  selector: 'content-data',
  templateUrl: './content-data.component.html'
})
export class ContentDataComponent implements OnInit {

  contentDataForm: FormGroup;
  dataFormGroup: FormGroup;

  @Input() content: Content;
  @Input() requests: Array<Request>;

  // true if from body is selected
  from: 'BODY' | 'URL' | 'REQUEST';
  formatedJSON: string;
  dataLoaded: any = null;

  methods = ['GET', 'POST'];

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    if (!this.content.data) {
      this.content.data = { from: 'BODY' };
    }

    this.from = this.content.data.from;

    this.dataFormGroup = this.formBuilder.group({
      from: [this.content.data.from, Validators.required],
      url: [this.content.data.url, Validators.required],
      method: [this.content.data.method, Validators.required],
      body: [this.content.data.body],
      request: [this.content.data.request],
      exampleBody: [this.content.data.exampleBody]
    });

    this.contentDataForm = this.formBuilder.group({
      name: [this.content.name, Validators.required],
      description: [this.content.description, Validators.required],
      data: this.dataFormGroup
    });

    this.contentDataForm.valueChanges.subscribe((value) => {
      Object.assign(this.content, value);
    });
  }

  isMethodPost() {
    if (this.content.data) {
      return this.content.data.method === 'POST';
    }
    return false;
  }

  fromBodyChange(value: 'BODY' | 'URL' | 'REQUEST') {
    this.from = value;

    switch (value) {
      case 'BODY': {
        this.dataFormGroup.reset({
          from: value,
          url: { value: null, disabled: true },
          method: { value: null, disabled: true },
          body: { value: null, disabled: true },
          request: null,
          exampleBody: null
        });
        break;
      }
      case 'URL': {
        this.dataFormGroup.reset({
          from: value,
          url: { value: null, disabled: false },
          method: { value: this.methods[0], disabled: false },
          body: { value: null, disabled: false },
          request: null,
          exampleBody: null
        });
        break;
      }
      case 'REQUEST': {
        this.dataFormGroup.reset({
          from: value,
          url: null,
          method: null,
          body: null,
          request: null,
          exampleBody: null
        });
        break;
      }
    }
  }

  formatJson(text) {
    if (!lodash.isEmpty(text)) {
      try {
        const object = JSON.parse(text);
        this.formatedJSON = JSON.stringify(object, null, 4);
        setTimeout(() => {
          this.contentDataForm.controls.exampleBody.setValue(JSON.stringify(object, null, 4));
        }, 0);
      } catch (err) {
        console.log('Invalid JSON', err);
      }
    }
  }

  loadData() {
    this.http.request(new HttpRequest(this.content.data.method, this.content.data.url, this.content.data.body)).subscribe((res) => {
      this.dataLoaded = res['body'] || res['text'];
    });
  }

  getData() {
    if (this.dataLoaded) {
      return this.formatedJSON = JSON.stringify(this.dataLoaded, null, 4);
    }
    return '';
  }
}
