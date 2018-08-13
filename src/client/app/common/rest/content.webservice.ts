import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { share } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Content } from '@shared/interface/content.int';

@Injectable()
export class ContentWebService {

  constructor(private httpClient: HttpClient) {}

  create(content: Content): Observable<Content> {
    return this.httpClient.post<Content>('/api/content', content).pipe(share());
  }

  update(content: Content): Observable<Content> {
    return this.httpClient.put<Content>(`/api/content/${content.reference}`, content).pipe(share());
  }

  delete(reference: string) {
    return this.httpClient.delete<Content>(`/api/content/${reference}`).pipe(share());
  }

  get(reference: string): Observable<Content> {
    return this.httpClient.get<Content>(`/api/content/${reference}`).pipe(share());
  }

  list(): Observable<Array<Content>> {
    return this.httpClient.get<Array<Content>>(`/api/content/list`).pipe(share());
  }
}
