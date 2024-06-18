import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserRoles } from 'src/app/core/model/enums.model';
import { FetchUsersSubResponse } from 'src/app/core/model/user.model';
import { EnumService } from 'src/app/core/service/enum.service';
import { UserManageService } from 'src/app/core/service/user-manage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assign-role',
  templateUrl: './assign-role.component.html',
  styleUrls: ['./assign-role.component.scss'],
})
export class AssignRoleComponent {
  getAllUsersSubscription$!: Subscription;
  updateRoleSubscription$!: Subscription;
  userList!: FetchUsersSubResponse[];

  pages: number[] = [];
  currentPage = 1;
  totalPages = 100;
  displayPages = 1;

  userRoleUpdateBtnIsDisable: boolean = false;

  userRoleControl = new FormControl('', Validators.required);

  userRoles: UserRoles[] = [];

  constructor(private _userManageService: UserManageService, private _enumService: EnumService) {
    this.updatePages();
  }

  ngOnInit(): void {
    this.getAllUsers();
    this.getUserRoles();
  }

  updateRole(userId: number) {
    this.userRoleUpdateBtnIsDisable = true;
    let role = this.userRoleControl.value!;

    if (role === '') {
      this.userRoleControl.setErrors({ required: true });
      this.userRoleControl.markAsTouched();
      this.userRoleUpdateBtnIsDisable = false;
      return;
    }

    this.updateRoleSubscription$ = this._userManageService.updateUserRole(userId, { role }).subscribe({
      next: (response) => {
        if (response.statusCode === 200) {
          Swal.fire({
            title: 'Success',
            text: 'User role updated successfully!',
            icon: 'success',
            background: '#bcf1cd',
            showConfirmButton: true,
          });
          this.getAllUsers();
          this.userRoleUpdateBtnIsDisable = false;
        } else {
          Swal.fire({
            title: 'Not updated',
            text: 'User role could not be updated. ',
            icon: 'error',
            showConfirmButton: true,
            background: '#fbdde2',
          });
          this.userRoleUpdateBtnIsDisable = false;
        }
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: 'There was an error updating the user. Please try again later.',
          icon: 'error',
          showConfirmButton: true,
          background: '#fbdde2',
        });
        this.userRoleUpdateBtnIsDisable = false;
      },
    });
  }

  getAllUsers() {
    this.getAllUsersSubscription$ = this._userManageService.getAllUsers().subscribe({
      next: (response) => {
        this.userList = response.ourUsersList.filter((user) => user.email.endsWith('@virtusa.com') === true);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getUserRoles() {
    this.userRoles = this._enumService.getUserRoles();
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
    this.updateRoleSubscription$?.unsubscribe();
  }
}
