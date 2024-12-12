import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserRoleManagementComponent } from './components/user-role-management/user-role-management.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [
    UserRoleManagementComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatFormFieldModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }