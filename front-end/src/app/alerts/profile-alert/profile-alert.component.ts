import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-profile-alert',
  standalone: true,
  imports: [],
  templateUrl: './profile-alert.component.html',
  styleUrl: './profile-alert.component.css',
})
export class ProfileAlertComponent {
  @Input() error: any;
  @Output() close = new EventEmitter<void>();

  onCloseClick() {
    this.close.emit();
  }
}
