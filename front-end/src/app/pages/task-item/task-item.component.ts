import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent {
  @Input() task: any;
  @Output() moveTask = new EventEmitter<{
    task: any;
    newStatus: 'toDo' | 'inProgress' | 'done';
  }>();

  getStatusClass(status: string): string {
    switch (status) {
      case 'toDo':
        return 'red';
      case 'inProgress':
        return 'yellow';
      case 'done':
        return 'green';
      default:
        return '';
    }
  }

  moveTaskStatus(status: 'toDo' | 'inProgress' | 'done'): void {
    this.moveTask.emit({ task: this.task, newStatus: status });
  }
}
