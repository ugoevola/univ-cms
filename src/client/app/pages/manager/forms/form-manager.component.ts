import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'form-manager',
  templateUrl: './form-manager.component.html'
})
export class FormManagerComponent {

  @HostBinding('class') class = 'flex-column';

  constructor() {}
}
