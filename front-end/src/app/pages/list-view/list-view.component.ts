import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CreateTaskDialogComponent } from '../../shared/create-task-dialog/create-task-dialog.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
  ],
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css'],
})
export class ListViewComponent implements OnInit {
  tasks: any[] = [];
  taskForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      summary: ['', Validators.required],
      priority: ['low', Validators.required],
      assignedTo: ['', Validators.required],
      dueDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadTasksFromLocalStorage();
  }

  openCreateTaskDialog(): void {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addTask(result);
        this.showSnackbar('Task added successfully!');
      }
    });
  }

  addTask(newTask: any): void {
    newTask.status = 'Wait list';
    this.tasks.push(newTask);
    this.saveTasksToLocalStorage();
  }

  updateTaskStatus(task: any, status: string): void {
    const index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks[index].status = status;
      this.saveTasksToLocalStorage();
      this.showSnackbar(`Task status updated to ${status}`);
    }
  }

  deleteTask(task: any): void {
    const index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      this.saveTasksToLocalStorage();
      this.showSnackbar('Task deleted successfully!');
    }
  }

  saveTasksToLocalStorage(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  loadTasksFromLocalStorage(): void {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      try {
        this.tasks = JSON.parse(tasks);
        if (!Array.isArray(this.tasks)) {
          this.tasks = [];
        }
      } catch (e) {
        console.error('Failed to parse tasks from localStorage', e);
        this.tasks = [];
      }
    }
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'low':
        return 'green';
      case 'medium':
        return 'yellow';
      case 'high':
        return 'red';
      default:
        return 'grey';
    }
  }

  showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // 3 seconds
    });
  }
}
