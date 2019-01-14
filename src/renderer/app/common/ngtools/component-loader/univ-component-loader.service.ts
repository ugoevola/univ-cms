import { Injectable, ComponentFactoryResolver, ViewContainerRef, ComponentRef } from '@angular/core';
import * as lodash from 'lodash';
import { UnivInputComponent } from './components/input/univ-input.component';
import { FormGroup } from '@angular/forms';

@Injectable()
export class UnivComponentLoaderService {

  private componentRef: ComponentRef<any>;

  constructor(private resolver: ComponentFactoryResolver) { }

  loadComponent(initData: { type: string, bindings: any, validations: any}, viewContainerRef: ViewContainerRef, group: FormGroup) {
    const componentFactory = this.getComponentFactory(initData.type);
    this.componentRef = viewContainerRef.createComponent(componentFactory);

    const componentInstance = this.componentRef.instance;

    componentInstance.formControlName = initData.bindings.name;
    componentInstance.group = group;

    lodash.forOwn(initData.bindings, (value, key) => {
      componentInstance[key] = value;
    });

    componentInstance.validations = initData.validations;

    return this.componentRef;
  }

  getComponentFactory(type: string) {
    switch (type) {
      case 'input':
        return this.resolver.resolveComponentFactory(UnivInputComponent);
    }
    return null;
  }
}
