import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';

const routes: Routes = [
  {path: "dashboard", component: DashboardComponent},
  {path: 'task/:taskId', component: TaskDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
