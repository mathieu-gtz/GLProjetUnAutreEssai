import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';

const BASE_URL = 'http://localhost:8080/api/admin/';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient, private storageService: StorageService) {}

  getUsers(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${StorageService.getToken()}`
    });
    return this.http.get<any[]>(BASE_URL + 'users', { headers });
  }

  updateUserRole(userId: number, newRole: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${StorageService.getToken()}`
    });
    return this.http.put(BASE_URL + `change-role/${userId}`, { newRole }, { headers });
  }
}
