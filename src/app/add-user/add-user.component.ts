import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormControlName, Validators } from '@angular/forms';
import { UserManagementService } from '../user-management.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  addUserForm: FormGroup;
  userDetails: Array<Object> = [];
  searchField = '';
  sortField = '';
  sortFirstName = false;
  sortLastName = false;
  sortEmpId = false;
  updateFlag = false;
  editedUserDetails: Object;
  constructor(private formBuilder: FormBuilder, private userManagementService: UserManagementService) { }

  ngOnInit() {
    this.buildAddUserFormValidation();
    this.getUser();
  }

  buildAddUserFormValidation() {
    this.addUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      empId: ['', Validators.required],
    });
  }
  getUser() {
    this.userManagementService.getUserService().subscribe(val => {
      this.userDetails = val;
    }, (error) => {
      console.log(error);
    });
  }
  addNewUser(formValue) {
    this.userManagementService.addNewUserService(formValue).subscribe(res => {
      if (res) {
        this.userManagementService.getUserService().subscribe(val => {
          this.userDetails = val;
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
  editUser(user) {
    this.addUserForm.patchValue(user);
    this.updateFlag = true;
    this.editedUserDetails = user;
  }
  updateUser() {
    this.userManagementService.addNewUserService(this.editedUserDetails).subscribe(res => {
      if (res) {
        this.userManagementService.getUserService().subscribe(val => {
          this.updateFlag = false;
          this.addUserForm.reset();
          this.userDetails = val;
        }, (error) => {
          console.log(error);
        });
      }
    },
      (error) => {
        console.log(error);
      });
  }
  deleteUser(user) {
    this.userManagementService.deletUserService(user).subscribe(res => {
      if (res) {
        this.userManagementService.getUserService().subscribe(val => {
          this.userDetails = val;
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
    this.addUserForm.reset();
    this.updateFlag = false;

  }
}
