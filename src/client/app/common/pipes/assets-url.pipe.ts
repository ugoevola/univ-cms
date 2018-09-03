import { Pipe, PipeTransform } from '@angular/core';
import { UniversalService } from '../universal/universal.service';


@Pipe({ name: 'assetsUrl' })
export class AssetsUrlPipe implements PipeTransform {

  constructor(private universalService: UniversalService) {
  }

  transform(url: string) {
    if (url) {
      const rootFolder = this.universalService.getRootFolder();
      if (rootFolder) {
        if (url.startsWith('/')) {
          return `${rootFolder}/assets${url}`;
        } else {
          return `${rootFolder}/assets/${url}`;
        }
      } else {
        if (url.startsWith('/')) {
          return `assets${url}`;
        } else {
          return `assets/${url}`;
        }
      }
    }
    return '';
  }
}
