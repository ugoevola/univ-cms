import { Content } from '@shared/interface/content.int';
import { Resolve} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentWebService } from '@rest/content.webservice';

@Injectable()
export class ContentsListResolver implements Resolve<Array<Content>> {

  constructor(private contentWebService:  ContentWebService) {
  }

  resolve(): Observable<Array<Content>> {
    return this.contentWebService.list();
  }

}
