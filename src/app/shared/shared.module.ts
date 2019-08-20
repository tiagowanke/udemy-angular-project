import {NgModule} from '@angular/core';
import {DropdownDirective} from './directive/dropdown.directive';
import { AlertComponent } from './alert/alert.component';
import { PlaceholderDirective } from './directive/placeholder.directive';
import {LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AlertComponent,
    DropdownDirective,
    LoadingSpinnerComponent,
    PlaceholderDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    DropdownDirective,
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective
  ],
  entryComponents: [
    AlertComponent
  ]
})
export class SharedModule {}
