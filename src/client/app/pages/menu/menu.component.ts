import { Component } from '@angular/core';
import { Page } from '@shared/interface/page.int';

@Component({
  selector: 'univ-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent {

  page: Page;

  constructor() {
    this.page.name = 'Page dto';
  }

}
