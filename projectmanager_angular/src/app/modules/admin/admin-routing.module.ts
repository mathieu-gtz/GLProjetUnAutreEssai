import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRoleManagementComponent } from './components/user-role-management/user-role-management.component';

const routes: Routes = [
  {path: "userRoleManagement", component: UserRoleManagementComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
