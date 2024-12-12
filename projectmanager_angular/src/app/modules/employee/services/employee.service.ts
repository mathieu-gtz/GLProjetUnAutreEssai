import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';

const BASE_URL = 'http://localhost:8080/api/employee/';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient, private storageService: StorageService) {}

  getTasksByEmployee(employeeId: string): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${StorageService.getToken()}`, 
    });
    return this.http.get<any[]>(BASE_URL + `${employeeId}/tasks`, { headers });
  }
  
  getTaskById(taskId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${StorageService.getToken()}`,
    });
    return this.http.get<any>(BASE_URL + `tasks/${taskId}`, { headers });
  }

  updateTaskStatus(taskId: string, status: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${StorageService.getToken()}`, 
    });
    return this.http.put(BASE_URL + `tasks/${taskId}/${status}`, {}, { headers });
  }
}