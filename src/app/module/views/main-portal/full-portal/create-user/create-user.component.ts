import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/model/user.model';
import { UserManageService } from 'src/app/core/service/user-manage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent {
  firstNameControl = new FormControl('', Validators.required);
  lastNameControl = new FormControl('', Validators.required);
  emailAddressControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@(virtusa\.com|kore\.ai)$/i)]);
  phoneNumberControl = new FormControl('', Validators.required);
  passwordControl = new FormControl('', Validators.required);
  confirmPasswordControl = new FormControl('', Validators.required);

  createUserSubscription$!: Subscription;

  submitBtnClicked: boolean = false;

  userSubmitForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _userService: UserManageService) {}

  ngOnInit(): void {
    this.userSubmitForm = this._formBuilder.group({
      firstName: this.firstNameControl,
      lastName: this.lastNameControl,
      emailAddress: this.emailAddressControl,
      phoneNumber: this.phoneNumberControl,
      password: this.passwordControl,
      confirmPassword: this.confirmPasswordControl,
    });
  }

  createUser = () => {
    this.submitBtnClicked = true;

    if (this.userSubmitForm.invalid) {
      Object.values(this.userSubmitForm.controls).forEach((control) => {
        control.markAsTouched();
      });
      this.submitBtnClicked = false;
      return;
    }

    if (this.passwordControl.value !== this.confirmPasswordControl.value) {
      this.passwordControl.setErrors({ notMatch: true });
      this.confirmPasswordControl.setErrors({ notMatch: true });
      this.submitBtnClicked = false;
      return;
    }

    const userDetails: User = {
      email: this.emailAddressControl.value!,
      name: this.firstNameControl.value + ' ' + this.lastNameControl.value,
      password: this.passwordControl.value!,
      city: this.phoneNumberControl.value!,
      roles: [],
    };

    this.createUserSubscription$ = this._userService.createUser(userDetails).subscribe({
      next: (response) => {
        if (response.statusCode == 200) {
          Swal.fire({
            title: 'Success',
            text: 'User created successfully!',
            icon: 'success',
            background: '#bcf1cd',
            showConfirmButton: true,
          });
          this.submitBtnClicked = false;
          this.userSubmitForm.reset();
        } else if (response.statusCode == 409) {
          Swal.fire({
            title: 'Error',
            text: 'User already exists!',
            icon: 'error',
            showConfirmButton: true,
            background: '#fbdde2',
          });
          this.submitBtnClicked = false;
          return;
        }
      },
      error: (error) => {
        if (error.status === 409) {
          Swal.fire({
            title: 'Error',
            text: 'User already exists!',
            icon: 'error',
            showConfirmButton: true,
            background: '#fbdde2',
          });
          this.submitBtnClicked = false;
          return;
        } else {
          Swal.fire({
            title: 'Error',
            text: 'There was an error creating the user. Please try again later.',
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

  ngOnDestroy(): void {
    this.createUserSubscription$?.unsubscribe();
  }
}
