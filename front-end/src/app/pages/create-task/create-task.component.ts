import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatInput } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import {
  MatDatepickerControl,
  MatDatepickerModule,
  MatDatepickerPanel,
} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; // Bu modülü buraya ekleyin
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule, // Bu modülü ekleyin
    MatSelectModule,
  ],
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
})
export class CreateTaskComponent {
  taskForm!: FormGroup;
  listOfEmployyes: any = ['Yavuz Mollahamzaoglu', 'Onur Kenis', 'Baris Hantas'];
  listOfPriorities: any = ['LOW', 'MEDIUM', 'HIGH'];
  dueDatePicker!: MatDatepickerPanel<MatDatepickerControl<any>, any, any>;
  router!: any;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      employeeId: [null, [Validators.required]],
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      dueDate: [null, [Validators.required]],
      priority: [null, [Validators.required]],
    });
  }

  postTask() {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;
      console.log('Task data:', taskData);
      this.router.navigate(['/main'], { state: { task: taskData } });
    } else {
      console.log('Form geçerli değil');
    }
  }
}
