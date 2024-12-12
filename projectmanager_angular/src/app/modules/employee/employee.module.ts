import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select'; 
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { TaskDetailsComponent } from './components/task-details/task-details.component';

@NgModule({
  declarations: [
    DashboardComponent,
    TaskDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    MatSelectModule,
    MatOptionModule,
    EmployeeRoutingModule
  ]
})
export class EmployeeModule { }