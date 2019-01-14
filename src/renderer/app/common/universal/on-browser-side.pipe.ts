import { Directive, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { UniversalService } from './universal.service';


@Directive({
  selector: '[onBrowserSide]'
})
export class OnBrowserSide implements OnInit {

  constructor(private universalService: UniversalService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) {
  }

  ngOnInit() {
    if (this.universalService.isClient()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
