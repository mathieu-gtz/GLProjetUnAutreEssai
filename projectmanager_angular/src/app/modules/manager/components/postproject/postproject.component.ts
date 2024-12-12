import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ManagerService } from '../../services/manager.service';
import { StorageService } from '../../../../auth/services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-postproject',
  standalone: false,
  templateUrl: './postproject.component.html',
  styleUrls: ['./postproject.component.scss']
})
export class PostprojectComponent implements OnInit {
  projectForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private managerService: ManagerService,
    private storageService: StorageService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    const managerId = StorageService.getUserId();
    this.projectForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      managerId: [managerId, [Validators.required]] 
    });
  }

  onSubmit() {
    if (this.projectForm.valid) {
      this.managerService.createProject(this.projectForm.value).subscribe(
        (res) => {
          this.snackbar.open('Project created successfully', 'Close', {
            duration: 5000,
            panelClass: 'success-snackbar',
          });
          this.router.navigate(['/manager/project', res.id]);
        },
        (error) => {
          this.snackbar.open('Failed to create project', 'Close', {
            duration: 5000,
            panelClass: 'error-snackbar',
          });
        }
      );
    }
  }
}