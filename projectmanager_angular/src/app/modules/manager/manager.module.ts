import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import { PostprojectComponent } from './components/postproject/postproject.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatOption, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import {  MatCardModule } from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { MatSelectModule } from '@angular/material/select';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { UpdateTaskComponent } from './components/update-task/update-task.component';


@NgModule({
  declarations: [
    DashboardComponent,
    PostprojectComponent,
    ProjectDetailsComponent,
    CreateTaskComponent,
    TaskDetailsComponent,
    UpdateTaskComponent
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
    ManagerRoutingModule,
    MatProgressBarModule,
    MatCardModule,
    MatOptionModule,
    MatSelectModule
  ]
})
export class ManagerModule { }
