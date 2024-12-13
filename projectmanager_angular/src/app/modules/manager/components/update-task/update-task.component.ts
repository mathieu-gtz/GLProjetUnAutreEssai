import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagerService } from '../../services/manager.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-task',
  standalone: false,
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent implements OnInit {
  taskId!: string;
  updateTaskForm!: FormGroup;
  listOfEmployees: any = [];
  listOfPriorities: any = ["LOW", "MEDIUM", "HIGH"];
  listOfTaskStatus: any = ["PENDING", "INPROGRESS", "COMPLETED", "DEFERRED", "CANCELLED"];

  constructor(
    private managerService: ManagerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('taskId')!;
    this.getTaskById();
    this.getEmployees();
    this.updateTaskForm = this.fb.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      dueDate: [null, [Validators.required]],
      priority: [null, [Validators.required]],
      taskStatus: [null, [Validators.required]],
      employee: [null, [Validators.required]]
    });
  }

  getTaskById(): void {
    this.managerService.getTaskById(this.taskId).subscribe((data) => {
      this.updateTaskForm.patchValue(data);
      console.log(data);
    });
  }

  getEmployees(): void {
    this.managerService.getEmployees().subscribe((data) => {
      this.listOfEmployees = data;
      console.log(data);
    });
  }

  updateTask(): void {
    if (this.updateTaskForm.valid) {
      const updatedTask = { ...this.updateTaskForm.value, id: this.taskId };
      this.managerService.updateTask(this.taskId, updatedTask).subscribe((res) => {
        if (res.id != null) {
          this.snackBar.open("Task updated successfully", "Close", { duration: 2000 });
          this.router.navigate(['/manager/task', this.taskId]);
        } else {
          this.snackBar.open("Error updating task", "ERROR", { duration: 2000 });
        }
      });
    }
  }
}
