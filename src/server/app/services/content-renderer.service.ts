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
    if (data) {
      if (data.from === 'BODY') {
        datas = req.body;
      } else if (data.from === 'URL') {
        try {
          const httpRes: AxiosResponse = await this.httpService.request({
            method: data.method,
            url: data.url,
            data: data.body,
            headers: {
              authorization: req['cookies'].authorization
            }
          }).toPromise();
          datas = httpRes.data;
        } catch (err) {
          console.log(err);
        }
      }
    }
    const template = content.content;
    Mustache.parse(template);
    const rendered = Mustache.render(template, datas);

    await this.univCache.set('content/' + content.reference, rendered);

    return rendered;
  }
}
