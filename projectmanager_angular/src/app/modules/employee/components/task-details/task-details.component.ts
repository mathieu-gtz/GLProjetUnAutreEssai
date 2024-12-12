import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-details',
  standalone: false,
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  taskForm!: FormGroup;
  taskId!: string;
  task: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('taskId')!;
    this.getTaskById();
    this.taskForm = this.fb.group({
      taskStatus: ['', Validators.required]
    });
  }

  getTaskById(): void {
    this.employeeService.getTaskById(this.taskId).subscribe(
      (task) => {
        this.task = task;
        this.taskForm.patchValue(task);
      },
      (error) => {
        console.error('Failed to load task details', error);
      }
    );
  }

  updateTaskStatus(): void {
    if (this.taskForm.valid) {
      const status = this.taskForm.value.taskStatus;
      this.employeeService.updateTaskStatus(this.taskId, status).subscribe(
        (res) => {
          this.snackBar.open('Task status updated successfully', 'Close', { duration: 2000 });
          this.router.navigate(['/employee/dashboard']);
        },
        (error) => {
          console.error('Failed to update task status', error);
          this.snackBar.open('Error updating task status', 'ERROR', { duration: 2000 });
        }
      );
    }
  }
}