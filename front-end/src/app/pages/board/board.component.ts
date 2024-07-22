import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { TaskItemComponent } from '../task-item/task-item.component';
import { CommonModule } from '@angular/common';

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
  ],
})
export class BoardComponent implements OnInit {
  taskForm!: FormGroup;
  tasks: Record<'toDo' | 'inProgress' | 'done', Task[]> = {
    toDo: [],
    inProgress: [],
    done: [],
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: [''],
      description: [''],
      priority: [''],
      employee: [''],
    });
    this.loadTasksFromLocalStorage();
  }

  addTask(): void {
    const newTask: Task = this.taskForm.value;
    newTask.status = 'toDo';
    this.tasks.toDo.push(newTask);
    this.taskForm.reset();
    this.saveTasksToLocalStorage();
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
  }

  clearTask(task: Task): void {
    this.removeTask(task);
    this.saveTasksToLocalStorage();
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
      this.tasks = JSON.parse(savedTasks);
    }
  }
}
