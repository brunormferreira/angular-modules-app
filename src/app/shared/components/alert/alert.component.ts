import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  @Input()
  public message: string = '';

  @Output()
  public close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
