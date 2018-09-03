import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'members-page',
  templateUrl: './members.page.html'
})
export class MembersPage {

  @HostBinding('class') class = 'flex-column';

 }
