import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { StorageService } from '../../../../auth/services/storage/storage.service';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tasks: any[] = [];
  searchForm!: FormGroup;

  constructor(
    private employeeService: EmployeeService,
    private storageService: StorageService,
    private router: Router,
    private fb:FormBuilder
  ) {
    this.searchForm = this.fb.group({
      title: [null]
    });
  }

  ngOnInit(): void {
    const employeeId = StorageService.getUser().id;
    this.employeeService.getTasksByEmployee(employeeId).subscribe(
      (tasks) => {
        this.tasks = tasks;
      },
      (error) => {
        console.error('Failed to load tasks', error);
      }
    );
  }

  viewTask(taskId: string): void {
    this.router.navigate(['/employee/task', taskId]);
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'LOW':
        return 'green';
      case 'MEDIUM':
        return 'orange';
      case 'HIGH':
        return 'red';
      default:
        return 'black';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'COMPLETED':
        return 'green';
      case 'INPROGRESS':
        return 'blue';
      case 'PENDING':
        return 'orange';
      case 'CANCELED':
        return 'red';
      case 'DEFERRED':
        return 'yellow';
      default:
        return 'black';
    }
  }

  searchTask(){
    this.tasks = [];
    const employeeId = StorageService.getUser().id;
    const title = this.searchForm.get('title').value;
    if (title.trim() === '') {
      this.employeeService.getTasksByEmployee(employeeId).subscribe(
        (tasks) => {
          this.tasks = tasks;
        });
    } else {
      this.employeeService.searchTask(employeeId, title).subscribe((res) => {
        this.tasks = res;
      });
    }
  }
}
