import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatNativeDateModule,
  DateAdapter,
  NativeDateAdapter,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
    yearYearA11yLabel: 'YYYY',
  },
};

@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: any): string {
    if (displayFormat === 'input') {
      return date
        ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
        : '';
    }
    return super.format(date, displayFormat);
  }
}

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.css'],
})
export class CreateTaskDialogComponent {
  taskForm: FormGroup;
  employees: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<CreateTaskDialogComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar // MatSnackBar'ı ekledik
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      summary: ['', Validators.required],
      priority: ['low', Validators.required],
      assignedTo: ['', Validators.required],
      dueDate: ['', Validators.required],
    });
    this.loadEmployeesFromLocalStorage();
  }

  loadEmployeesFromLocalStorage(): void {
    const employees = localStorage.getItem('employees');
    if (employees) {
      this.employees = JSON.parse(employees);
    }
  }

  addTask(): void {
    if (this.taskForm.valid) {
      const newTask = this.taskForm.value;
      this.dialogRef.close(newTask);

      this.snackBar.open('Task successfully added!', 'Close', {
        duration: 3000,
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
