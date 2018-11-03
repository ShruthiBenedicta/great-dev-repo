import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserManagementService } from '../user-management.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public activeLabel: string;
  constructor(private route: Router, private userManagementService: UserManagementService) {
    // this.userManagementService.FlagFromViewTaskScreen$.subscribe(res => {
    //   if (res) {
    //     this.activeLabel = '/addTask';
    //     // this.route.navigateByUrl('/addTask');
    //   }
    // });
  }

  ngOnInit() {
  }
  navigate(value) {
    switch (value) {
      case 'addUser':
        this.activeLabel = '/addUser';
        this.route.navigateByUrl('/addUser');
        break;
      case 'addProject':
        this.activeLabel = '/addProject';
        this.route.navigateByUrl('/addProject');
        break;
      case 'addTask':
        this.activeLabel = '/addTask';
        this.route.navigateByUrl('/addTask');
        break;
      case 'viewTask':
        this.activeLabel = '/viewTask';
        this.route.navigateByUrl('/viewTask');
        break;
    }
  }
}
