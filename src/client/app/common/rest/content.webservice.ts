import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { share } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Content } from '@shared/interface/content.int';
import { UniversalService } from '../universal/universal.service';

@Injectable()
export class ContentWebService {

  private baseUrl = null;

  constructor(private httpClient: HttpClient, private universalService: UniversalService) {
    this.baseUrl = `${this.universalService.getApiUrl()}/content`;
  }

  create(content: Content): Observable<Content> {
    return this.httpClient.post<Content>(`${this.baseUrl}`, content).pipe(share());
  }

  update(content: Content): Observable<Content> {
    return this.httpClient.put<Content>(`${this.baseUrl}/${content.reference}`, content).pipe(share());
  }

  delete(reference: string) {
    return this.httpClient.delete<Content>(`${this.baseUrl}/${reference}`).pipe(share());
  }

  get(reference: string): Observable<Content> {
    return this.httpClient.get<Content>(`${this.baseUrl}/${reference}`).pipe(share());
  }

  list(): Observable<Array<Content>> {
    return this.httpClient.get<Array<Content>>(`${this.baseUrl}/list`).pipe(share());
  }
}
