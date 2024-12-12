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
  ) {}

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

    // Méthode pour rechercher des projets (commentée pour l'instant)
  /*
  onSearch(): void {
    const title = this.searchForm.get('title')?.value;
    // Implémenter la logique de recherche ici
  }
  */
}
