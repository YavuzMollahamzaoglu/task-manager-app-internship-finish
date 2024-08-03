import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { BoardComponent } from '../board/board.component';
import { ListViewComponent } from '../list-view/list-view.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [NavbarComponent, BoardComponent, ListViewComponent],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  tasks: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadTasksFromLocalStorage();
  }

  loadTasksFromLocalStorage(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.http
        .get('http://localhost:3008/tasks', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .subscribe({
          next: (res: any) => {
            this.tasks = res.tasks || [];
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
          },
          error: (error: any) => {
            console.error('Error loading tasks', error);
          },
        });
    }
  }
}
