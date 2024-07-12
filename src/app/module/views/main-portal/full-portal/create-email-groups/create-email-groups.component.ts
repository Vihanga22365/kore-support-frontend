import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserManageService } from 'src/app/core/service/user-manage.service';
import { FetchUsersSubResponse } from 'src/app/core/model/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Severity } from 'src/app/core/model/enums.model';
import { EnumService } from 'src/app/core/service/enum.service';

@Component({
  selector: 'app-create-email-groups',
  templateUrl: './create-email-groups.component.html',
  styleUrls: ['./create-email-groups.component.scss'],
})
export class CreateEmailGroupsComponent {
  getAllUsersSubscription$!: Subscription;
  userList!: FetchUsersSubResponse[];

  emailGroupForm!: FormGroup;

  emailAddressControl = new FormControl('', Validators.required);
  severityControl = new FormControl('', Validators.required);

  severities: Severity[] = [];

  submitBtnClicked: boolean = false;

  pages: number[] = [];
  currentPage = 1;
  totalPages = 100;
  displayPages = 1;

  constructor(private _userManageService: UserManageService, private _enumService: EnumService) {
    this.emailGroupForm = new FormGroup({
      emailAddress: this.emailAddressControl,
    });

    this.updatePages();
  }

  ngOnInit(): void {
    this.getAllUsers();
    this.severities = this._enumService.getSeverity();
  }

  createEmailGroup = () => {
    console.log('Create Email Group');
  };

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
