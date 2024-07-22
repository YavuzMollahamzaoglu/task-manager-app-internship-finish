import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProfileAlertComponent } from '../../alerts/profile-alert/profile-alert.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    MatFormFieldModule,
    ProfileAlertComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  error: string | null = null;

  saveChanges() {
    this.error = 'Changes saved successfully!';
  }

  clearError() {
    this.error = null;
  }
}
