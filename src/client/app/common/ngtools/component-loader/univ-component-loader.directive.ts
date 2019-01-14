import { Directive, ViewContainerRef, Input, OnInit, ComponentRef, OnDestroy } from '@angular/core';
import { UnivComponentLoaderService } from './univ-component-loader.service';
import { FormGroup } from '@angular/forms';


@Directive({
  selector: '[univComponentLoader]',
  providers: [UnivComponentLoaderService]
})
export class UnivComponentLoader implements OnInit, OnDestroy {


  @Input()
  private initData: { type: string, bindings: any, validations: any};

  @Input()
  private group: FormGroup;

  private componentRef: ComponentRef<any>;

  constructor(private viewContainerRef: ViewContainerRef, private componentLoader: UnivComponentLoaderService) {
  }

  ngOnInit() {
    this.componentRef = this.componentLoader.loadComponent(this.initData,
      this.viewContainerRef,
      this.group);
  }

  ngOnDestroy() {
    this.componentRef.destroy();
  }
}
