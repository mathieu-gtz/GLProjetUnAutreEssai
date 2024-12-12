import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-user-role-management',
  standalone: false,
  templateUrl: './user-role-management.component.html',
  styleUrls: ['./user-role-management.component.scss'],
})
export class UserRoleManagementComponent implements OnInit {
  userRoleForm!: FormGroup;
  users: any[] = [];

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userRoleForm = this.fb.group({
      userId: [null, [Validators.required]],
      role: [null, [Validators.required]]
    });

    this.loadUsers();
  }

  loadUsers() {
    this.adminService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  onSubmit() {
    if (this.userRoleForm.valid) {
      const userId = this.userRoleForm.get('userId')?.value;
      const newRole = this.userRoleForm.get('role')?.value;
      this.adminService.updateUserRole(userId, newRole).subscribe(
        (res) => {
          console.log('Response:', res);
          this.snackbar.open('User role updated successfully', 'Close', {
            duration: 5000,
            panelClass: 'success-snackbar',
          });
        },
        (error) => {
          console.error('Error:', error);
          this.snackbar.open('Failed to update user role', 'Close', {
            duration: 5000,
            panelClass: 'error-snackbar',
          });
        }
      );
    }
  }
}