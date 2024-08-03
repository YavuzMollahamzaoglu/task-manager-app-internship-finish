import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLabel } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, MatLabel],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  profile: any;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.profileForm = this.fb.group({
      userName: [''],
      colleague: [''],
      workLocation: [''],
      workTitle: [''],
      location: [''],
      phoneNumber: [''],
    });
  }

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    const token = localStorage.getItem('accessToken');
    if (token) {
      this.http
        .get('http://localhost:3008/profiles', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .subscribe({
          next: (res: any) => {
            this.profile = res;
            this.profileForm.patchValue(res);
          },
          error: (error: any) => {
            console.error('Error fetching profile', error);
            this.snackBar.open(
              'Error fetching profile. Please try again.',
              'Close',
              {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
              }
            );
          },
        });
    } else {
      this.snackBar.open('No token found, please login first.', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
  }

  saveChanges() {
    const token = localStorage.getItem('accessToken');
    if (token) {
      this.http
        .post('http://localhost:3008/profile', this.profileForm.value, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .subscribe({
          next: (res: any) => {
            this.snackBar.open('Changes saved successfully!', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          },
          error: (error: any) => {
            console.error('Error saving changes', error);
            this.snackBar.open(
              'Error saving changes. Please try again later.',
              'Close',
              {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
              }
            );
          },
        });
    } else {
      this.snackBar.open('No token found, please login first.', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
  }
}
