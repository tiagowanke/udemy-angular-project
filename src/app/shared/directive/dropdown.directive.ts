import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[udemyProjectDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.open') isOpen = false;

  @HostListener('click')
  toggleOpen(): void {
    this.isOpen = !this.isOpen;
  }

}
