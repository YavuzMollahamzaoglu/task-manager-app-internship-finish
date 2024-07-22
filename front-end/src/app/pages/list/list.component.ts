import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CommonModule } from '@angular/common';
import { CreateTaskDialogComponent } from '../../shared/create-task-dialog/create-task-dialog.component';

interface Task {
  title: string;
  description: string;
  priority: string;
  employee: string;
  status: 'toDo' | 'inProgress' | 'done';
}

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  tasks: Task[] = [];

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.tasks.push({ ...result, status: 'toDo' });
        this.updateTasks();
      }
    });
  }

  moveTask(task: Task, newStatus: 'toDo' | 'inProgress' | 'done'): void {
    task.status = newStatus;
    this.updateTasks();
  }

  deleteTask(task: Task): void {
    this.tasks = this.tasks.filter((t) => t !== task);
    this.updateTasks();
  }

  updateTasks(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'toDo':
        return 'red';
      case 'inProgress':
        return 'yellow';
      case 'done':
        return 'green';
      default:
        return 'grey';
    }
  }

  getNextStatus(
    status: 'toDo' | 'inProgress' | 'done'
  ): 'toDo' | 'inProgress' | 'done' {
    switch (status) {
      case 'toDo':
        return 'inProgress';
      case 'inProgress':
        return 'done';
      case 'done':
        return 'done';
      default:
        return 'toDo';
    }
  }
}
