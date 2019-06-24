import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[udemyProjectPlaceholder]'
})
export class PlaceholderDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
