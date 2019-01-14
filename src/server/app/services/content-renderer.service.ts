import { Injectable, HttpService } from '@nestjs/common';
import { Content } from '@shared/interface/content.int';

import * as Mustache from 'mustache';
import { UnivCache } from '@common/cache.storage';
import { AxiosResponse } from 'axios';


@Injectable()
export class ContentRendererService {

  constructor(private readonly univCache: UnivCache,
    private readonly httpService: HttpService) {
  }

  public async render(content: Content, req: Request) {
    const cachedContent: string = await this.univCache.get('content/' + content.reference);
    if (cachedContent) {
      return cachedContent;
    }

    let datas: any = {};
    const data = content.data;

    switch (data && data.from) {
      case 'BODY':
        datas = req.body;
        break;
      case 'URL':
        try {
          const httpRes: AxiosResponse = await this.sendRequest(data.method, data.url, data.body, req);
          datas = httpRes.data;
        } catch (err) {
          console.log(err);
        }
        break;
      case 'REQUEST':
        try {
          const httpRes: AxiosResponse = await this.sendRequest(data.request.method, data.request.url, data.request.body, req);
          datas = httpRes.data;
        } catch (err) {
          console.log(err);
        }
        break;
    }

    const template = content.content;
    Mustache.parse(template);
    const rendered = Mustache.render(template, datas);

    await this.univCache.set('content/' + content.reference, rendered);

    return rendered;
  }

  private sendRequest(method, url, body, req) {
    return this.httpService.request({
      method: method,
      url: url,
      data: body,
      headers: {
        authorization: req['cookies'].authorization
      }
    }).toPromise();
  }
}
