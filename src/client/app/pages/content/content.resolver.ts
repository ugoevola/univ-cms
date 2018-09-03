

import { Content } from '@shared/interface/content.int';
import { Resolve, ActivatedRouteSnapshot} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentWebService } from '@rest/content.webservice';

@Injectable()
export class ContentResolver implements Resolve<Content> {

  constructor(private contentWebService: ContentWebService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Content> {
    const reference = route.paramMap.get('reference');
    return this.contentWebService.get(reference);
  }

}
