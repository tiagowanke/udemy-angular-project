import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'udemy-project-loading-spinner',
  template: '<div class="lds-facebook"><div></div><div></div><div></div></div>',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {

  constructor() { }
}
