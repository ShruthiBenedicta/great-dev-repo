import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormControlName, Validators } from '@angular/forms';
import { UserManagementService } from '../user-management.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  addTaskForm: FormGroup;
  projectList: Array<Object> = [];
  userList: Array<Object> = [];
  taskList: Array<Object> = [];
  enableDate = false;
  selectedProject = '';
  selectedParentTask = '';
  selectedUser = '';
  updateFlag = false;
  parentTaskList: Array<Object> = [];
  dataFromViewTask: Object;
  changeProjectFlag = false;
  today: any;
  tomorrow: any;
  constructor(private formBuilder: FormBuilder, private userManagementService: UserManagementService) { }

  ngOnInit() {
    const d = new Date();
    this.today = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    const d1 = new Date(d);
    d1.setDate(d.getDate() + 1);
    this.tomorrow = d1.getFullYear() + '-' + (d1.getMonth() + 1) + '-' + d1.getDate();
    this.buildaddTaskFormValidation();
    this.getTask();
    if (this.userManagementService.DataFromViewTaskScreen != null) {
      this.dataFromViewTask = this.userManagementService.DataFromViewTaskScreen;
      this.updateFlag = true;
      this.changeProjectFlag = true;
      this.addTaskForm.patchValue({
        projectName: this.dataFromViewTask['project']['projectName'],
        projectId: this.dataFromViewTask['project']['projectId'],
        taskName: this.dataFromViewTask['subTask']['taskName'],
        parentTaskStatus: this.dataFromViewTask['parent']['status'],
        parentTaskName: this.dataFromViewTask['parent']['taskName'],
        parentTaskId: this.dataFromViewTask['parent']['taskId'],
        startDate: this.dataFromViewTask['subTask']['taskName'],
        endDate: this.dataFromViewTask['subTask']['taskName'],
        priority: this.dataFromViewTask['subTask']['taskName'],
        userId: '',
        user: '',
      });
      if (this.addTaskForm.value.parentTaskStatus === true) {
        this.enableDate = true;
      }
    }
  }
  buildaddTaskFormValidation() {
    this.addTaskForm = this.formBuilder.group({
      projectName: ['', Validators.required],
      projectId: ['', Validators.required],
      taskName: ['', Validators.required],
      parentTaskStatus: [''],
      parentTaskName: [''],
      parentTaskId: [''],
      startDate: [''],
      endDate: [''],
      priority: [''],
      userId: [''],
      user: ['', Validators.required],
    });
  }
  getTask() {
    this.userManagementService.getTaskService().subscribe(val => {
      this.projectList = val['projectList'];
      this.userList = val['userList'];
    }, (error) => {
      console.log(error);
    });
  }
  getState(event) {
    if (event.target.checked) {
      this.addTaskForm.get('parentTaskStatus').setValue(true);
      this.enableDate = true;
    } else {
      this.addTaskForm.get('parentTaskStatus').setValue(false);
      this.enableDate = false;
    }
  }
  getProjectList(selectedProject) {
    this.addTaskForm.get('projectId').setValue(selectedProject);
    for (let i = 0; i < this.projectList.length; i++) {
      if (this.projectList[i]['projectId'] === selectedProject) {
        this.addTaskForm.get('projectName').setValue(this.projectList[i]['projectName']);
      }
    }
  }
  openParentListModel(formValue) {
    for (let i = 0; i < this.projectList.length; i++) {
      if (this.projectList[i]['projectId'] === formValue.projectId) {
        this.parentTaskList.push(this.projectList[i]['parentTask']);
      }
    }
  }
  getParentTask(selectedParentTask) {
    this.addTaskForm.get('parentTaskId').setValue(selectedParentTask);
    for (let i = 0; i < this.projectList.length; i++) {
      if (this.projectList[i]['parentTask']['parentTaskId'] === selectedParentTask) {
        this.addTaskForm.get('parentTaskName').setValue(this.projectList[i]['parentTask']['parentTaskName']);
      }
    }
  }
  getUserList(selectedUser) {
    this.addTaskForm.get('userId').setValue(selectedUser);
    for (let i = 0; i < this.userList.length; i++) {
      if (this.userList[i]['userId'] === selectedUser) {
        const name = this.userList[i]['firstName'] + ' ' + this.userList[i]['lastName'];
        this.addTaskForm.get('user').setValue(name);
      }
    }
  }
  addNewTask(formValue) {
    this.userManagementService.addNewTaskService(formValue).subscribe(res => {
      if (res) {
        this.userManagementService.getTaskService().subscribe(val => {
          this.projectList = val['projectList'];
          this.userList = val['userList'];
        }, (error) => {
          console.log(error);
        });
      }
    },
      (error) => {
        console.log(error);
      });
    console.log(formValue);
  }
  reset() {
    this.updateFlag = false;
    this.changeProjectFlag = false;
    this.enableDate = false;
    this.addTaskForm.reset();
  }
  ngOnDestroy() {
    this.userManagementService.DataFromViewTaskScreen = null;
    this.updateFlag = false;
    this.changeProjectFlag = false;
  }
}
