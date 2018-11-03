import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserManagementService {

  DataFromViewTaskScreen: any = null;
  // FlagFromViewTaskScreen = false;

  FlagFromViewTaskScreen = false;
  FlagFromViewTaskScreen$: Observable<boolean>;

  constructor(private http: HttpClient) { }

  /** Services for Add User Page starts here */

  addNewUserService(value): Observable<any> {
    const url = '/assets/data/addUser.json';
    if (value.userId) {
      return this.http.put(url, value);
    } else {
      return this.http.post(url, value);
    }
  }

  deletUserService(value): Observable<any> {
    const url = '/assets/data/addUser.json';
    return this.http.post(url, value);
  }

  getUserService(): Observable<any> {
    const url = '/assets/data/getUser.json';
    return this.http.get(url);
  }

  /** Services for Add User Page ends here */

  /** Services for Add Project Page starts here */

  getProjectService(): Observable<any> {
    const url = '/assets/data/getProject.json';
    return this.http.get(url);
  }

  addNewProjectService(value): Observable<any> {
    const url = '/assets/data/addProject.json';
    if (value.projectId) {
      return this.http.put(url, value);
    } else {
      return this.http.post(url, value);
    }
  }

  suspendProjectService(value): Observable<any> {
    const url = '/assets/data/addUser.json';
    return this.http.post(url, value);
  }

  /** Services for Add Project Page ends here */

  /** Services for Add Task Page starts here */

  getTaskService(): Observable<any> {
    const url = '/assets/data/addTaskGet.json';
    return this.http.get(url);
  }

  addNewTaskService(param): Observable<any> {
    const url = '/assets/data/getProject.json';
    return this.http.post(url, param);
  }

  /** Services for Add Task Page ends here */
  /** Services for View Task Page starts here */

  getTaskListViewService(): Observable<any> {
    const url = '/assets/data/viewTaskGet.json';
    return this.http.get(url);
  }

  endTaskService(param): Observable<any> {
    const url = '/assets/data/viewTaskGet.json';
    return this.http.post(url, param);
  }

  /** Services for View Task Page ends here */
}
