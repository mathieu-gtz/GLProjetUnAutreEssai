import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ManagerService } from '../../services/manager.service';

@Component({
  selector: 'app-task-details',
  standalone: false,
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  task: any;

  constructor(
    private route: ActivatedRoute,
    private managerService: ManagerService
  ) {}

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('taskId');
    this.managerService.getTaskById(taskId).subscribe(
      (task) => {
        this.task = task;
      },
      (error) => {
        console.error('Failed to load task details', error);
      }
    );
  }
}