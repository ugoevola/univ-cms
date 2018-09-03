import { Component, HostBinding } from '@angular/core';


@Component({
  selector: 'asi-panel',
  templateUrl: './asi-panel.component.html'
})
export class AsiPanel {

  @HostBinding('class') class = 'asi-component asi-panel';

  constructor() {}
}
