import { HostBinding, Component, Input, ContentChild } from '@angular/core';
import {  AsiComponentTemplateListItemDef } from './asi-list-item.component';


@Component({
  selector: 'asi-list',
  templateUrl: './asi-list.component.html'
})
export class AsiList {

  @HostBinding('class') class = 'asi-component asi-list-item';
  @ContentChild(AsiComponentTemplateListItemDef) listItemDef: AsiComponentTemplateListItemDef;

  // private _baseData: Array<any> = [];
  filteredData: Array<any> = [];

  @Input()
  set data(data: Array<any>) {
    // this.baseData = data;
    this.filteredData = data;
  }

}
