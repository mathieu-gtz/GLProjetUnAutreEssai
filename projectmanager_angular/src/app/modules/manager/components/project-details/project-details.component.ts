import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagerService } from '../../services/manager.service';

@Component({
  selector: 'app-project-details',
  standalone: false,
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  project: any;
  progress: number = 0;

  constructor(
    private route: ActivatedRoute,
    private managerService: ManagerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    this.managerService.getProjectById(projectId).subscribe(
      (project) => {
        this.project = project;
        this.managerService.getTasksByProjectId(projectId).subscribe(
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
}