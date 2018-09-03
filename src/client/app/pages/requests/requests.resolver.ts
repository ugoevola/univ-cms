

import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { RequestWebService } from '@rest/request.webservice';
import { Request } from '@shared/interface/request.int';

@Injectable()
export class RequestsResolver implements Resolve<Array<Request>> {

  constructor(private requestWebService: RequestWebService) {}

  async resolve(): Promise<Array<Request>> {
    const requests = await this.requestWebService.list().toPromise();
    return requests || [];
  }

}
