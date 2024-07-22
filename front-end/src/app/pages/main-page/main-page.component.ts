import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { BoardComponent } from '../board/board.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [NavbarComponent, BoardComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent implements OnInit {
  router!: string;
  taskData: any;

  ngOnInit() {
    if (history.state && history.state.task) {
      this.taskData = history.state.task;
      console.log('Received task data:', this.taskData);
    }
  }
}
