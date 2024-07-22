import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { BoardComponent } from '../board/board.component';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [NavbarComponent, BoardComponent, ListComponent],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  tasks: any[] = [];

  ngOnInit() {
    this.loadTasksFromLocalStorage();
  }

  loadTasksFromLocalStorage(): void {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
  }
}
