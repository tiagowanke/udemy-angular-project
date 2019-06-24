import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'udemy-project-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() message: string;
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }

}
