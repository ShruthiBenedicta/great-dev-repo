import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../user-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  projectList: Array<Object> = [];
  parentTask: Array<Object> = [];
  sortField = '';
  searchField = '';
  selectedProjectValue: any;
  constructor(private userManagementService: UserManagementService, private router: Router) { }

  ngOnInit() {
    this.getTaskList();
  }
  getTaskList() {
    this.userManagementService.getTaskListViewService().subscribe(res => {
      this.projectList = res['projectList'];
    }, (error) => {
      console.log(error);
    });
  }
  getSelectedTaskDetails(selectedProject) {
    for (let i = 0; i < this.projectList.length; i++) {
      if (this.projectList[i]['projectId'] === selectedProject) {
        this.selectedProjectValue = this.projectList[i];
        this.searchField = this.projectList[i]['projectName'];
        this.parentTask = this.projectList[i]['parentTask'];
      }
    }
    console.log(this.parentTask);
  }
  sort(field) {
    this.sortField = field;
  }
  editTask(parent, subTask) {
    const obj = Object.assign({
      parent: parent,
      subTask: subTask,
      project: this.selectedProjectValue
    });
    this.userManagementService.DataFromViewTaskScreen = obj;
    this.userManagementService.FlagFromViewTaskScreen = true;
    this.router.navigateByUrl('/addTask');
  }
  endProject(parent, subTask) {
    const val = {};
    this.userManagementService.endTaskService(val).subscribe(res => {
      console.log(res);
    }, (error) => {
      console.log(error);
    });
  }
}
