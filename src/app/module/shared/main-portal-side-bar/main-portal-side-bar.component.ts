import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-portal-side-bar',
  templateUrl: './main-portal-side-bar.component.html',
  styleUrls: ['./main-portal-side-bar.component.scss'],
})
export class MainPortalSideBarComponent implements OnInit {
  userRole!: string[];

  ngOnInit(): void {
    this.checkUserRole();
  }

  checkUserRole = () => {
    const user_role = localStorage.getItem('user_role');
    this.userRole = JSON.parse(user_role!);
  };
}
