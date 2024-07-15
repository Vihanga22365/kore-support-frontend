import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ChangePasswordUser, SingleUserDetailsResponse, SingleUserResponse, User } from 'src/app/core/model/user.model';
import { UserManageService } from 'src/app/core/service/user-manage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  userNameControl = new FormControl('', Validators.required);
  emailAddressControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@(virtusa\.com|kore\.ai)$/i)]);
  phoneNumberControl = new FormControl('', Validators.required);

  currentPasswordControl = new FormControl('', Validators.required);
  passwordControl = new FormControl('', Validators.required);
  confirmPasswordControl = new FormControl('', Validators.required);

  submitBtnClicked: boolean = false;
  changePwdBtnClicked: boolean = false;

  userSubmitForm!: FormGroup;
  changePasswordForm!: FormGroup;

  updateUserSubscription$!: Subscription;
  changePasswordSubscription$!: Subscription;
  getUserDetailsSubscription$!: Subscription;

  userDetails!: SingleUserDetailsResponse | null;

  constructor(private _formBuilder: FormBuilder, private _userService: UserManageService) {}

  ngOnInit(): void {
    this.userSubmitForm = this._formBuilder.group({
      userName: this.userNameControl,
      emailAddress: this.emailAddressControl,
      phoneNumber: this.phoneNumberControl,
    });

    this.changePasswordForm = this._formBuilder.group({
      currentPassword: this.currentPasswordControl,
      password: this.passwordControl,
      confirmPassword: this.confirmPasswordControl,
    });

    this.getUserDetails();
  }

  getUserDetails = () => {
    this.getUserDetailsSubscription$ = this._userService.getUserDetails().subscribe({
      next: (response) => {
        // console.log(response);
        this.userDetails = response.ourUsers;
        this.userNameControl.setValue(this.userDetails.name);
        this.emailAddressControl.setValue(this.userDetails.email);
        this.phoneNumberControl.setValue(this.userDetails.city);
      },
      error: (error) => {
        console.log(error);
      },
    });
  };

  changePassword = () => {
    this.changePwdBtnClicked = true;

    if (this.changePasswordForm.invalid) {
      Object.values(this.changePasswordForm.controls).forEach((control) => {
        control.markAsTouched();
      });
      this.changePwdBtnClicked = false;
      return;
    }

    if (this.passwordControl.value !== this.confirmPasswordControl.value) {
      this.passwordControl.setErrors({ notMatch: true });
      this.confirmPasswordControl.setErrors({ notMatch: true });
      this.changePwdBtnClicked = false;
      return;
    }

    const userDetails: ChangePasswordUser = {
      currentPassword: this.currentPasswordControl.value!,
      newPassword: this.passwordControl.value!,
      newPasswordConfirmation: this.confirmPasswordControl.value!,
    };

    this.changePasswordSubscription$ = this._userService.changePassword(this.userDetails!.id, userDetails).subscribe({
      next: (response) => {
        if (response.statusCode === 200) {
          Swal.fire({
            title: 'Success',
            text: 'Password changed successfully!',
            icon: 'success',
            background: '#bcf1cd',
            showConfirmButton: true,
          });
          this.changePwdBtnClicked = false;
          this.changePasswordForm.reset();
        } else {
          Swal.fire({
            title: 'Error',
            text: response.message,
            icon: 'error',
            showConfirmButton: true,
            background: '#fbdde2',
          });
          this.changePwdBtnClicked = false;
        }
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: 'There was an error changing the password. Please try again later.',
          icon: 'error',
          showConfirmButton: true,
          background: '#fbdde2',
        });
        this.changePwdBtnClicked = false;
      },
    });
  };

  updateUser = () => {
    this.submitBtnClicked = true;

    if (this.userSubmitForm.invalid) {
      Object.values(this.userSubmitForm.controls).forEach((control) => {
        control.markAsTouched();
      });
      this.submitBtnClicked = false;
      return;
    }

    const updatedUserDetails = {
      email: this.emailAddressControl.value!,
      name: this.userNameControl.value!,
      city: this.phoneNumberControl.value!,
    };

    this.updateUserSubscription$ = this._userService.updateUserDetails(this.userDetails!.id, updatedUserDetails).subscribe({
      next: (response) => {
        if (response.statusCode === 200) {
          Swal.fire({
            title: 'Success',
            text: 'User updated successfully!',
            icon: 'success',
            background: '#bcf1cd',
            showConfirmButton: true,
          });
          this.submitBtnClicked = false;
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
        this.submitBtnClicked = false;
      },
    });
  };

  ngOnDestroy(): void {
    this.updateUserSubscription$?.unsubscribe();
    this.changePasswordSubscription$?.unsubscribe();
    this.getUserDetailsSubscription$?.unsubscribe();
  }
}
