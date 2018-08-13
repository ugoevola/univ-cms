import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'template-manager',
  templateUrl: './template-manager.component.html'
})
export class TemplateManagerComponent {

  @HostBinding('class') class = 'flex-column';

  constructor() {}
}
