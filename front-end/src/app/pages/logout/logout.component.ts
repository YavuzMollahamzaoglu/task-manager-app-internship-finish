import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent {
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.logout();
  }

  logout() {
    localStorage.removeItem('token');

    this.router.navigate(['/login']);
  }
}
