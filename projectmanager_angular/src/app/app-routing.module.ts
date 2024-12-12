import  { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';

const routes: Routes = [
    {path: "login", component: LoginComponent},
    {path: "signup", component: SignupComponent},
    {path: "admin", loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)},
    {path: "employee", loadChildren: () => import('./modules/employee/employee.module').then(m => m.EmployeeModule)},
    {path: "manager", loadChildren: () => import('./modules/manager/manager.module').then(m => m.ManagerModule)},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
 