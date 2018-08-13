import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'content-page',
  templateUrl: './content.page.html'
})
export class ContentPage {

  @HostBinding('class') class = 'flex-column';

  constructor() {}
}
