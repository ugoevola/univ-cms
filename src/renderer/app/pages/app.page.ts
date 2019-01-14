import { Component, HostBinding, Injector } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './app.page.html'
})
export class AppPage {

  @HostBinding('class') class = 'flex-column';

  constructor(private injector: Injector) {
  }

  isServer() {
  }

  getContent() {
    return this.injector.get('request').CONTENT;
  }
}
