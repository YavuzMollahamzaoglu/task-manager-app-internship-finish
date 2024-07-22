import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  userForm: FormGroup;
  isFormSubmitted: boolean = false;
  isUserCreated: boolean = false;

  constructor(private http: HttpClient) {
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
          },
          error: (err) => {
            console.error('Error while registering user', err);
            this.isUserCreated = false;
          },
        });
    }
  }
}
