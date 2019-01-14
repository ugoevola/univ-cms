import { Directive, TemplateRef, Component } from '@angular/core';

@Directive({
  selector: '[asiListItemDef]',
})
export class AsiComponentTemplateListItemDef {
  constructor(public template: TemplateRef<any>) {
  }
}

@Component({
  selector: 'asi-list-item',
  template: '<ng-content></ng-content>'
})
export class AsiListItemTemplate {
  constructor() {
  }
}
