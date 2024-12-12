import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoAngularMaterialModule } from './DemoAngularMaterialModule';
import { LoginComponent } from "./auth/components/login/login.component";
import { SignupComponent } from "./auth/components/signup/signup.component";
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AdminModule } from "./modules/admin/admin.module";
import { ManagerModule } from "./modules/manager/manager.module";
import { EmployeeModule } from "./modules/employee/employee.module";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SignupComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        DemoAngularMaterialModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        AdminModule,
        ManagerModule,
        EmployeeModule

    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }