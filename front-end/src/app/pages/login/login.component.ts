import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,

    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginObj: Login;
  error: string | null = null;

  constructor(private http: HttpClient, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { email: string } | undefined;
    this.loginObj = new Login(state?.email || '');
  }

  onLogin() {
    if (!this.loginObj.email || !this.loginObj.password) {
      this.error = 'Please enter both email and password.';
      return;
    }

    this.http.post('http://localhost:3008/login', this.loginObj).subscribe({
      next: (res: any) => {
        if (res.message === 'Login successful' && res.accessToken) {
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);
          this.router
            .navigateByUrl('/main')
            .then(() => {
              console.log('Navigation to /main successful');
            })
            .catch((err) => {
              console.error('Navigation error:', err);
              this.error = 'Navigation error. Please try again.';
            });
        } else {
          this.error = 'Login failed. Please check your credentials.';
        }
      },
      error: (error: any) => {
        console.error('Login error', error);
        this.error = 'An error occurred during login. Please try again later.';
      },
    });
  }

  clearError() {
    this.error = null;
  }
}

export class Login {
  email: string;
  password: string;
  constructor(email: string = '') {
    this.email = email;
    this.password = '';
  }
}
