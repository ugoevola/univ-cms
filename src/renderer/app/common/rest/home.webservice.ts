import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { share } from 'rxjs/operators';
import { UniversalService } from '../universal/universal.service';

@Injectable()
export class HomeWebService {

  private apiUrl = null;

  constructor(private httpClient: HttpClient, private universalService: UniversalService) {
    this.apiUrl = this.universalService.getApiUrl();
  }

  me() {
    return this.httpClient.get(`${this.apiUrl}/me`).pipe(share());
  }
}
