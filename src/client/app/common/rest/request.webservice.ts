import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { share } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Request } from '@shared/interface/request.int';
import { UniversalService } from '../universal/universal.service';

@Injectable()
export class RequestWebService {

  private baseUrl = null;

  constructor(private httpClient: HttpClient, private universalService: UniversalService) {
    this.baseUrl = `${this.universalService.getApiUrl()}/request`;
  }

  create(request: Request): Observable<Request> {
    return this.httpClient.post<Request>(`${this.baseUrl}`, request).pipe(share());
  }

  update(request: Request): Observable<Request> {
    return this.httpClient.put<Request>(`${this.baseUrl}/${request.reference}`, request).pipe(share());
  }

  delete(reference: string) {
    return this.httpClient.delete<Request>(`${this.baseUrl}/${reference}`).pipe(share());
  }

  get(reference: string): Observable<Request> {
    return this.httpClient.get<Request>(`${this.baseUrl}/${reference}`).pipe(share());
  }

  list(): Observable<Array<Request>> {
    return this.httpClient.get<Array<Request>>(`${this.baseUrl}/list`).pipe(share());
  }
}
