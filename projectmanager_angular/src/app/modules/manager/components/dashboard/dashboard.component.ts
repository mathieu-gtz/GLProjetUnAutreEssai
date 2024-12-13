import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../../auth/services/storage/storage.service';
import { ManagerService } from '../../services/manager.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  projects: any[] = [];
  searchForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private managerService: ManagerService,
    private storageService: StorageService,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      title: [null]
    });
  }

  ngOnInit(): void {
    const managerId = StorageService.getUserId();
    this.managerService.getProjectsByManager(managerId).subscribe(
      (projects) => {
        this.projects = projects;
      },
      (error) => {
        console.error('Failed to load projects', error);
      }
    );

    this.searchForm = this.fb.group({
      title: ['']
    });
  }

  viewProject(projectId: string): void {
    this.router.navigate(['/manager/project', projectId]);
  }

  searchProject(){
    this.projects = [];
    const managerid = Number(StorageService.getUserId());
    const title = this.searchForm.get('title')!.value;
    if (title.trim() === '') {
      this.managerService.getProjectsByManager(StorageService.getUserId()).subscribe(
        (projects) => {
          this.projects = projects;
        });
    } else {
      this.managerService.searchProject(managerid, title).subscribe((res) => {
        this.projects = res;
      });
    }
  }
}
