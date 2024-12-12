import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagerService } from '../../services/manager.service';

@Component({
  selector: 'app-create-task',
  standalone: false,
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  taskForm!: FormGroup;
  projectId!: string;
  listOfEmployees: any[] = []; // Ajoutez cette propriété

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private managerService: ManagerService
  ) {}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('projectId')!;
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      priority: ['', Validators.required],
      employee: ['', Validators.required] // Ajoutez le champ employee
    });

    // Récupérer la liste des employés
    this.managerService.getEmployees().subscribe(
      (employees) => {
        this.listOfEmployees = employees;
      },
      (error) => {
        console.error('Failed to load employees', error);
      }
    );
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const task = { ...this.taskForm.value, projectId: this.projectId };
      this.managerService.createTask(task).subscribe(
        (newTask) => {
          this.router.navigate(['/manager/project', this.projectId]);
        },
        (error) => {
          console.error('Failed to create task', error);
        }
      );
    }
  }
}