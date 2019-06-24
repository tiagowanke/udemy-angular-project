import {NgModule} from '@angular/core';
import {DropdownDirective} from './directive/dropdown.directive';
import { AlertComponent } from './alert/alert.component';
import { PlaceholderDirective } from './directive/placeholder.directive';

@NgModule({
  declarations: [
    DropdownDirective,
    AlertComponent,
    PlaceholderDirective
  ],
  exports: [
    DropdownDirective,
    AlertComponent,
    PlaceholderDirective
  ],
  entryComponents: [
    AlertComponent
  ]
})
export class SharedModule {}
