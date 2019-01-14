import { Component, HostBinding, Input } from '@angular/core';
import * as Mustache from 'mustache';
import * as lodash from 'lodash';
import { Content } from '@shared/interface/content.int';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient, HttpRequest, HttpEventType } from '@angular/common/http';
import { share } from 'rxjs/operators';

@Component({
  selector: 'content-preview',
  templateUrl: './content-preview.component.html'
})
export class ContentPreviewComponent {

  @HostBinding('class') class = 'flex-column';

  @Input() content: Content;
  @Input() loadedData: any;

  dataLoading = false;
  dataError = false;

  constructor(private sanitizer: DomSanitizer,
    private http: HttpClient) { }

  hasPreview(): boolean {
    return !lodash.isEmpty(this.content.content);
  }

  getPreview(): SafeHtml {
    if (!this.content.content) {
      return null;
    }
    const template = this.content.content;
    Mustache.parse(template);

    try {
      if (this.content.data.from === 'BODY') {
        const rendered = Mustache.render(template, JSON.parse(this.content.data.exampleBody || '{}'));
        return this.sanitizer.bypassSecurityTrustHtml(rendered);
      } else if (this.content.data.from === 'URL') {
        if (this.loadedData) {
          const rendered = Mustache.render(template, this.loadedData);
          return this.sanitizer.bypassSecurityTrustHtml(rendered);
        } else {
          this.loadData(this.content.data);
        }
      } else if (this.content.data.from === 'REQUEST') {
        if (this.loadedData) {
          const rendered = Mustache.render(template, this.loadedData);
          return this.sanitizer.bypassSecurityTrustHtml(rendered);
        } else {
          this.loadData(this.content.data.request);
        }
      }
    } catch (err) {
      this.dataLoading = false;
      console.log(err);
    }
    return '';
  }

  private loadData(request) {
    if (!this.dataLoading && !this.dataError) {
      this.dataLoading = true;
      this.http.request(new HttpRequest(request.method,
        request.url, request.body,
        { reportProgress: false, responseType: 'json' })).pipe(share()).subscribe((res) => {
          if (res.type !== HttpEventType.Sent) {
            const data = res['body'] || res['text'];
            this.loadedData = data || {};
            this.dataLoading = false;
          }
        }, (err) => {
          this.dataLoading = false;
          this.dataError = true;
          console.log(err);
        });
    }
  }
}
