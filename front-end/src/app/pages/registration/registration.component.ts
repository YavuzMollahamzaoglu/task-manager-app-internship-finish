import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router, NavigationExtras } from '@angular/router';
import { SuccessDialogComponent } from '../../shared/user-created-dialog/user-created-dialog.component';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
  ],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  userForm: FormGroup;
  isFormSubmitted: boolean = false;
  isUserCreated: boolean = false;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.userForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      isAgree: new FormControl(false, Validators.requiredTrue),
    });
  }

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.userForm.valid) {
      this.http
        .post('http://localhost:3008/register', this.userForm.value)
        .subscribe({
          next: (res) => {
            console.log('User registered successfully', res);
            this.isUserCreated = true;
            this.openDialog();
          },
          error: (err) => {
            console.error('Error while registering user', err);
            this.isUserCreated = false;
          },
        });
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      const navigationExtras: NavigationExtras = {
        state: { email: this.userForm.value.email },
      };
      this.router.navigate(['/login'], navigationExtras);
    });
  }
}
