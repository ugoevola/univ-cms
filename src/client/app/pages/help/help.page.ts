import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'help-page',
  templateUrl: './help.page.html'
})
export class HelpPage {

  @HostBinding('class') class = 'flex-column';

 }
