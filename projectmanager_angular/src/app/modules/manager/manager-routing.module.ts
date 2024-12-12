import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostprojectComponent } from './components/postproject/postproject.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { UpdateTaskComponent } from './components/update-task/update-task.component';

const routes: Routes = [
  {path: "dashboard", component: DashboardComponent},
  {path: 'create-project', component: PostprojectComponent},
  {path: 'project/:id', component: ProjectDetailsComponent },
  {path: 'project/:projectId/create-task', component: CreateTaskComponent },
  {path: 'task/:taskId', component: TaskDetailsComponent },
  {path: 'task/:taskId/edit', component: UpdateTaskComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
