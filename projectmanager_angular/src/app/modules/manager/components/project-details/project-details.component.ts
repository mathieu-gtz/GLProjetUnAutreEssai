import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagerService } from '../../services/manager.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {StorageService} from '../../../../auth/services/storage/storage.service';

@Component({
  selector: 'app-project-details',
  standalone: false,
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  project: any;
  progress: number = 0;
  searchForm!: FormGroup;
  projectId : string;

  constructor(
    private route: ActivatedRoute,
    private managerService: ManagerService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      title: [null]
    });
  }

  ngOnInit(): void {
    this.projectId = String(this.route.snapshot.paramMap.get('id'));
    console.log('Project ID:', this.projectId);
    this.managerService.getProjectById(this.projectId).subscribe(
      (project) => {
        this.project = project;
        this.managerService.getTasksByProjectId(this.projectId).subscribe(
          (tasks) => {
            this.project.tasks = tasks;
            this.calculateProgress();
          },
          (error) => {
            console.error('Failed to load tasks', error);
          }
        );
      },
      (error) => {
        console.error('Failed to load project details', error);
      }
    );
  }

  calculateProgress(): void {
    if (this.project && this.project.tasks) {
      const completedTasks = this.project.tasks.filter(task => task.taskStatus === 'COMPLETED').length;
      this.progress = (completedTasks / this.project.tasks.length) * 100;
    }
  }

  viewTask(taskId: string): void {
    this.router.navigate(['/manager/task', taskId]);
  }


  searchTask() {
    this.project.tasks = [];
    const title = this.searchForm.get('title').value;
    if (title.trim() === '') {
      this.managerService.getTasksByProjectId(this.projectId).subscribe(
        (tasks) => {
          this.project.tasks = tasks;
          console.log(tasks);
        });
    } else {
      this.managerService.searchTask(Number(this.projectId), title).subscribe((res) => {
        console.log(res);
        this.project.tasks = res;
      });
    }
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
}
