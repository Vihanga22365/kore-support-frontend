import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserManageService } from 'src/app/core/service/user-manage.service';
import { FetchUsersSubResponse } from 'src/app/core/model/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Severity } from 'src/app/core/model/enums.model';
import { EnumService } from 'src/app/core/service/enum.service';
import { EmailGroups, EmailGroupsResponse } from 'src/app/core/model/email-groups.model';
import { EmailGroupsService } from 'src/app/core/service/email-groups.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-email-groups',
  templateUrl: './create-email-groups.component.html',
  styleUrls: ['./create-email-groups.component.scss'],
})
export class CreateEmailGroupsComponent {
  getAllUsersSubscription$!: Subscription;
  createEmailGroupSubscription$!: Subscription;
  getEmailGroupsSubscription$!: Subscription;
  deleteEmailGroupSubscription$!: Subscription;

  userList!: FetchUsersSubResponse[];

  emailGroupForm!: FormGroup;

  emailAddressControl = new FormControl('', Validators.required);
  severityControl = new FormControl('', Validators.required);

  severities: Severity[] = [];
  selectedSeverities: string[] = [];
  emailGroupList: EmailGroupsResponse[] = [];

  submitBtnClicked: boolean = false;
  showSeverityError: boolean = false;

  pages: number[] = [];
  currentPage = 1;
  totalPages = 100;
  displayPages = 1;

  constructor(private _userManageService: UserManageService, private _emailGroupsService: EmailGroupsService, private _enumService: EnumService) {
    this.emailGroupForm = new FormGroup({
      emailAddress: this.emailAddressControl,
    });

    this.updatePages();
  }

  ngOnInit(): void {
    this.getAllUsers();
    this.getEmailGroups();
    this.severities = this._enumService.getSeverity();
  }

  changeSeverityAssisgn = (event: Event, severityName: string) => {
    const checkbox = event.target as HTMLInputElement;
    const isChecked = checkbox.checked;

    if (isChecked) {
      this.showSeverityError = false;
      if (!this.selectedSeverities.includes(severityName)) {
        this.selectedSeverities.push(severityName);
      }
    } else {
      const index = this.selectedSeverities.indexOf(severityName);
      if (index > -1) {
        this.selectedSeverities.splice(index, 1);
      }
    }

    console.log(this.selectedSeverities);
  };

  createEmailGroup = () => {
    this.submitBtnClicked = true;

    if (this.emailGroupForm.invalid) {
      Object.values(this.emailGroupForm.controls).forEach((control) => {
        control.markAsTouched();
      });
      this.submitBtnClicked = false;
      return;
    }

    if (this.selectedSeverities.length === 0) {
      this.submitBtnClicked = false;
      this.showSeverityError = true;
      return;
    } else {
      this.showSeverityError = false;
    }

    const emailGroupDetails: EmailGroups = {
      email: this.emailAddressControl.value!,
      severities: this.selectedSeverities,
    };

    this.createEmailGroupSubscription$ = this._emailGroupsService.createEmailGroup(emailGroupDetails).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Success',
          text: 'Email group created successfully!',
          icon: 'success',
          background: '#bcf1cd',
          showConfirmButton: true,
        });
        this.submitBtnClicked = false;
        this.emailGroupForm.reset();
        this.getEmailGroups();
      },
      error: (error) => {
        if (error.status === 409) {
          Swal.fire({
            title: 'Error',
            text: 'Email group already exist in the system.',
            icon: 'error',
            showConfirmButton: true,
            background: '#fbdde2',
          });
          this.submitBtnClicked = false;
          return;
        } else {
          Swal.fire({
            title: 'Error',
            text: 'There was an error creating the email group. Please try again later.',
            icon: 'error',
            showConfirmButton: true,
            background: '#fbdde2',
          });
          this.submitBtnClicked = false;
          return;
        }
      },
    });
  };

  getEmailGroups = () => {
    this.getEmailGroupsSubscription$ = this._emailGroupsService.getEmailGroups().subscribe({
      next: (response) => {
        this.emailGroupList = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
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

  deleteEmailGroup = (emailGroupId: number) => {
    this.deleteEmailGroupSubscription$ = this._emailGroupsService.deleteEmailGroup(emailGroupId).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Success',
          text: 'Email group deleted successfully!',
          icon: 'success',
          background: '#bcf1cd',
          showConfirmButton: true,
        });
        this.getEmailGroups();
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: 'There was an error deleting the email group. Please try again later.',
          icon: 'error',
          showConfirmButton: true,
          background: '#fbdde2',
        });
      },
    });
  };

  getSeverityDisplayName(enumName: any): string {
    const severity = this._enumService.getSeverity().find((type) => type.enumName === enumName);
    return severity ? severity.displayName : 'Unknown';
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
    this.createEmailGroupSubscription$?.unsubscribe();
    this.getEmailGroupsSubscription$?.unsubscribe();
    this.deleteEmailGroupSubscription$?.unsubscribe();
  }
}
