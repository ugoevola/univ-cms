import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'content-manager',
  templateUrl: './content-manager.page.html'
})
export class ContentManagerPage {

  @HostBinding('class') class = 'flex-column';

  formOrTemplate = 'form';

  constructor() {}
}
