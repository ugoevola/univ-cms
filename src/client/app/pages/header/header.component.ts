import { Component, OnInit } from '@angular/core';
import { UserStore } from '../../common/store/user.store';
import { User } from '@shared/interface/user.int';

@Component({
  selector: 'univ-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  user: User;

  constructor(private userStore: UserStore) {
  }

  ngOnInit() {
    this.user = this.userStore.getUser();
  }

}
