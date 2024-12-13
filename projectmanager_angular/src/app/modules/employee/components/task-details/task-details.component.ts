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
  taskId: string;
  task: any;
  comments:any;
  commentForm!: FormGroup;

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
    this.getComments();
    this.taskForm = this.fb.group({
      taskStatus: ['', Validators.required]
    });
    this.commentForm = this.fb.group({
      content: [null, Validators.required]
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

  publishComment() {
    let taskid : number = Number(this.taskId);
    this.employeeService.createComment(taskid, this.commentForm.get("content").value).subscribe((res)=>{
      if(res.id != null){
        this.snackBar.open("Comment published successfully", "Close", {duration:5000});
        this.getComments();
        this.commentForm.get("content").reset();
      }
      else{
        this.snackBar.open("Error encountered while publishing comment.", "Error", {duration:5000});
      }
    });
  }

  getComments(){
    let taskid : number = Number(this.taskId);
    this.employeeService.getCommentsByTask(taskid).subscribe((res)=>{
      this.comments=res;
    });
  }
}
