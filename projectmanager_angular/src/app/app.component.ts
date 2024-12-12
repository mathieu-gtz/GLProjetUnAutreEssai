import { Component } from '@angular/core';
import { StorageService } from './auth/services/storage/storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'projectmanager_angular';
  isEmployeeLoggedIn: boolean = StorageService.isEmployeeLoggedIn();
  isManagerLoggedIn: boolean = StorageService.isManagerLoggedIn();
  isAdminLoggedIn: boolean = StorageService.isAdminLoggedIn();

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.isEmployeeLoggedIn = StorageService.isEmployeeLoggedIn();
      this.isManagerLoggedIn = StorageService.isManagerLoggedIn();
      this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
    });
  }

  logout() {
    StorageService.logout();
    this.router.navigateByUrl('/login');
  }
}
