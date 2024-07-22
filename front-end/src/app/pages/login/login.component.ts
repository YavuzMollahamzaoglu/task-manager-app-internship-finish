import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProfileAlertComponent } from '../../alerts/profile-alert/profile-alert.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterModule, ProfileAlertComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginObj: Login;
  error: any;

  constructor(private http: HttpClient, private router: Router) {
    this.loginObj = new Login();
  }

  onLogin() {
    this.http.post('http://localhost:3008/login', this.loginObj).subscribe({
      next: (res: any) => {
        if (res.message === 'Login successful') {
          alert('Login success');
          this.router.navigateByUrl('/main');
        } else {
          alert('Login failed');
        }
      },
      error: (error: any) => {
        console.error('Login error', error);
        alert(`Login error: ${error.error.error}`);
      },
    });
  }
}

export class Login {
  email: string;
  password: string;
  constructor() {
    this.email = '';
    this.password = '';
  }
}
