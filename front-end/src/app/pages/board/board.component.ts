import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskItemComponent } from '../task-item/task-item.component';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

interface Task {
  title: string;
  description: string;
  priority: string;
  employee: string;
  status: 'toDo' | 'inProgress' | 'done';
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    TaskItemComponent,
    CommonModule,
    NavbarComponent,
    DragDropModule,
  ],
})
export class BoardComponent implements OnInit {
  taskForm!: FormGroup;
  tasks: Record<'toDo' | 'inProgress' | 'done', Task[]> = {
    toDo: [],
    inProgress: [],
    done: [],
  };

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {} // Inject MatSnackBar

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: [''],
      description: [''],
      priority: [''],
      employee: [''],
    });

    this.initializeEmptyTasks();
    this.loadTasksFromLocalStorage();
    console.log('Loaded Tasks:', this.tasks);
  }

  addTask(): void {
    console.log('Form Value:', this.taskForm.value);
    console.log('Tasks:', this.tasks);

    const newTask: Task = {
      ...this.taskForm.value,
      status: 'toDo',
    };

    console.log('New Task:', newTask);

    if (!this.tasks.toDo) {
      console.error('tasks.toDo is undefined');
      return;
    }

    this.tasks.toDo.push(newTask);
    this.taskForm.reset();
    this.saveTasksToLocalStorage();

    this.snackBar.open('Task added successfully!', 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  moveTask(event: {
    task: Task;
    newStatus: 'toDo' | 'inProgress' | 'done';
  }): void {
    const { task, newStatus } = event;
    this.removeTask(task);
    task.status = newStatus;
    this.tasks[newStatus].push(task);
    this.saveTasksToLocalStorage();

    this.snackBar.open(
      `Moved successfully to ${this.capitalizeStatus(newStatus)}!`,
      'Close',
      {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      }
    );
  }

  clearTask(task: Task): void {
    this.removeTask(task);
    this.saveTasksToLocalStorage();

    this.snackBar.open('Task deleted successfully!', 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  removeTask(task: Task): void {
    for (const key of Object.keys(this.tasks) as Array<
      'toDo' | 'inProgress' | 'done'
    >) {
      const index = this.tasks[key].indexOf(task);
      if (index > -1) {
        this.tasks[key].splice(index, 1);
        break;
      }
    }
  }

  saveTasksToLocalStorage(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  loadTasksFromLocalStorage(): void {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        this.tasks = {
          toDo: parsedTasks.toDo || [],
          inProgress: parsedTasks.inProgress || [],
          done: parsedTasks.done || [],
        };
      } catch (error) {
        console.error('Error parsing tasks from localStorage:', error);
        this.initializeEmptyTasks();
      }
    } else {
      this.initializeEmptyTasks();
    }
    console.log('Tasks loaded from localStorage:', this.tasks);
  }

  initializeEmptyTasks(): void {
    this.tasks = {
      toDo: [],
      inProgress: [],
      done: [],
    };
  }

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const task = event.container.data[event.currentIndex];
      task.status = this.getStatusFromContainerId(event.container.id);
    }
    this.saveTasksToLocalStorage();
  }

  private getStatusFromContainerId(
    containerId: string
  ): 'toDo' | 'inProgress' | 'done' {
    if (containerId.includes('toDo')) return 'toDo';
    if (containerId.includes('inProgress')) return 'inProgress';
    return 'done';
  }

  private capitalizeStatus(status: 'toDo' | 'inProgress' | 'done'): string {
    switch (status) {
      case 'toDo':
        return 'To Do';
      case 'inProgress':
        return 'In Progress';
      case 'done':
        return 'Done';
      default:
        return '';
    }
  }
}
