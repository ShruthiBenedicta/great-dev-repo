import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormControlName, Validators } from '@angular/forms';
import { UserManagementService } from '../user-management.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  addProjectForm: FormGroup;
  projectDetails: Array<Object> = [];
  searchField = '';
  sortField = '';
  enableDate = false;
  selectedManager = '';
  managersList: Array<Object> = [];
  updateFlag = false;
  editedProjectDetails: Object = {};
  today: any;
  tomorrow: any;
  constructor(private formBuilder: FormBuilder, private userManagementService: UserManagementService) { }

  ngOnInit() {
    const d = new Date();
    this.today = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    const d1 = new Date(d);
    d1.setDate(d.getDate() + 1);
    this.tomorrow = d1.getFullYear() + '-' + (d1.getMonth() + 1) + '-' + d1.getDate();
    this.buildaddProjectFormValidation();
    this.getProject();
  }

  buildaddProjectFormValidation() {
    this.addProjectForm = this.formBuilder.group({
      projectName: ['', Validators.required],
      startDate: [''],
      endDate: [''],
      priority: [''],
      managerId: [''],
      manager: ['', Validators.required],
    });
  }
  getManagerList(selectedManager) {
    this.addProjectForm.get('managerId').setValue(selectedManager);
    for (let i = 0; i < this.managersList.length; i++) {
      if (this.managersList[i]['managerId'] === selectedManager) {
        const name = this.managersList[i]['firstName'] + ' ' + this.managersList[i]['lastName'];
        this.addProjectForm.get('manager').setValue(name);
      }
    }
  }
  getState(event) {
    if (event.target.checked) {
      this.enableDate = true;
    } else {
      this.enableDate = false;
    }
  }
  getProject() {
    this.userManagementService.getProjectService().subscribe(val => {
      this.projectDetails = val['projectList'];
      this.managersList = val['managerList'];
    }, (error) => {
      console.log(error);
    });
  }
  addNewProject(formValue) {
    this.userManagementService.addNewProjectService(formValue).subscribe(res => {
      if (res) {
        this.userManagementService.getProjectService().subscribe(val => {
          this.projectDetails = val['projectList'];
          this.managersList = val['managerList'];
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
  sort(field) {
    this.sortField = field;
  }
  editProject(project) {
    this.reset();
    this.addProjectForm.patchValue(project);
    if (project.startDate || project.endDate) {
      this.enableDate = true;
    }
    this.updateFlag = true;
    this.editedProjectDetails = project;
  }
  updateProject() {
    this.userManagementService.addNewProjectService(this.editedProjectDetails).subscribe(res => {
      if (res) {
        this.userManagementService.getProjectService().subscribe(val => {
          this.projectDetails = val['projectList'];
          this.managersList = val['managerList'];
          this.updateFlag = false;
          this.addProjectForm.reset();
        }, (error) => {
          console.log(error);
        });
      }
    },
      (error) => {
        console.log(error);
      });
  }
  suspendProject(project) {
    this.userManagementService.suspendProjectService(project).subscribe(res => {
      if (res) {
        this.userManagementService.getProjectService().subscribe(val => {
          this.projectDetails = val['projectList'];
          this.managersList = val['managerList'];
        }, (error) => {
          console.log(error);
        });
      }
    },
      (error) => {
        console.log(error);
      });
  }
  reset() {
    this.addProjectForm.reset();
    this.updateFlag = false;
    this.enableDate = false;
  }

}
