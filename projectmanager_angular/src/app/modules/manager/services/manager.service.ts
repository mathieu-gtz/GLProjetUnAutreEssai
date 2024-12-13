import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';

const BASE_URL = 'http://localhost:8080/api/manager/';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  constructor(private http: HttpClient, private storageService: StorageService) {}

  createProject(project: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${StorageService.getToken()}`
    });
    return this.http.post(BASE_URL + 'projects', project, { headers });
  }

  getProjectById(projectId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${StorageService.getToken()}`,
    });
    return this.http.get(BASE_URL + `projects/${projectId}`, { headers });
  }

  getProjectsByManager(managerId: string): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${StorageService.getToken()}`,
    });
    return this.http.get<any[]>(BASE_URL + `managers/${managerId}/projects`, { headers });
  }

  getTasksByProjectId(projectId: string): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${StorageService.getToken()}`,
    });
    return this.http.get<any[]>(BASE_URL + `projects/${projectId}/tasks`, { headers });
  }

  createTask(task: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${StorageService.getToken()}`,
    });
    return this.http.post(BASE_URL + `projects/${task.projectId}/tasks`, task, { headers });
  }

  getEmployees(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${StorageService.getToken()}`,
    });
    return this.http.get<any[]>(BASE_URL + 'employees', { headers });
  }

  getTaskById(taskId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${StorageService.getToken()}`,
    });
    return this.http.get<any>(BASE_URL + `tasks/${taskId}`, { headers });
  }

  updateTask(taskId: string, task: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${StorageService.getToken()}`,
    });
    return this.http.put(BASE_URL + `tasks/${taskId}`, task, { headers });
  }

  searchProject(managerId:number, title:String):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${StorageService.getToken()}`,
    });
    return this.http.get(BASE_URL +"managers/"+ managerId+"/projects/search/" +title, {headers});
  }

  searchTask(projectId:number, title:String):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${StorageService.getToken()}`,
    });
    return this.http.get(BASE_URL + "projects/"+projectId+"/tasks/search/" +title, {headers});
  }

  createComment(id:number, content:string):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${StorageService.getToken()}`,
    });
    const params={
      content:content
    };
    return this.http.post(BASE_URL + "task/comment/" + id, null, {params:params, headers});
  }

  getCommentsByTask(id:number):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${StorageService.getToken()}`,
    });
    return this.http.get(BASE_URL + "comments/" + id, {headers});
  }


}
