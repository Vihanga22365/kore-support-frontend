import { Component, OnDestroy, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net-buttons';
import { Subscription } from 'rxjs';
import { UserManageService } from 'src/app/core/service/user-manage.service';
import { FetchUsersSubResponse } from 'src/app/core/model/user.model';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss'],
})
export class ViewUsersComponent implements OnInit, OnDestroy {
  getAllUsersSubscription$!: Subscription;
  userList!: FetchUsersSubResponse[];

  pages: number[] = [];
  currentPage = 1;
  totalPages = 100;
  displayPages = 1;

  constructor(private _userManageService: UserManageService) {
    this.updatePages();
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.getAllUsersSubscription$ = this._userManageService.getAllUsers().subscribe({
      next: (response) => {
        this.userList = response.ourUsersList;
        console.log(this.userList);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  setPage(page: number) {
    this.currentPage = page;
    this.updatePages();
  }

  updatePages() {
    let startPage = Math.max(this.currentPage - this.displayPages, 1);
    let endPage = Math.min(this.currentPage + this.displayPages, this.totalPages);

    this.pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }

  ngOnDestroy(): void {
    this.getAllUsersSubscription$?.unsubscribe();
  }
}
