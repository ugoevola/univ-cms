import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Content } from '@shared/interface/content.int';

@Component({
  selector: 'content-list',
  templateUrl: './content-list.page.html'
})
export class ContentListPage implements OnInit {

  @HostBinding('class') class = 'flex-column';

  contents: Array<Content>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.contents = this.route.snapshot.data.contents;
  }
}
