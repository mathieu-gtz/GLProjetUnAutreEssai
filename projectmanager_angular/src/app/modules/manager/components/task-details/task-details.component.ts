import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ManagerService } from '../../services/manager.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-details',
  standalone: false,
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  task: any;
  comments: any;
  taskId:string;
  commentForm:FormGroup;

  constructor(
    private route: ActivatedRoute,
    private managerService: ManagerService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('taskId');
    this.getComments();
    this.managerService.getTaskById(this.taskId).subscribe(
      (task) => {
        this.task = task;
      },
      (error) => {
        console.error('Failed to load task details', error);
      }
    );
    this.commentForm = this.fb.group({
      content: [null, Validators.required]
    });
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
    this.managerService.createComment(taskid, this.commentForm.get("content").value).subscribe((res)=>{
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
    this.managerService.getCommentsByTask(taskid).subscribe((res)=>{
      this.comments=res;
    });
  }
}
