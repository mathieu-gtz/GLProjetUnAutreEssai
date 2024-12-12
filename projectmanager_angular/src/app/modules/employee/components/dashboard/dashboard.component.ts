import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { StorageService } from '../../../../auth/services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tasks: any[] = [];

  constructor(
    private employeeService: EmployeeService,
    private storageService: StorageService,
    private router: Router
  ) {}

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
}