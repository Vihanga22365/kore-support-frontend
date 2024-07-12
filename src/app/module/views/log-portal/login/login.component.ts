import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LogInUser } from 'src/app/core/model/user.model';
import { UserManageService } from 'src/app/core/service/user-manage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  emailControl = new FormControl('', Validators.required);
  userpasswordControl = new FormControl('', Validators.required);

  logInUserSubscription$!: Subscription;

  logInSubmitForm!: FormGroup;

  loggedBtnClicked: boolean = false;

  constructor(private _formBuilder: FormBuilder, private _userService: UserManageService, private router: Router) {
    this.logInSubmitForm = this._formBuilder.group({
      email: this.emailControl,
      password: this.userpasswordControl,
    });
  }

  ngOnInit(): void {}

  logInUser = () => {
    this.loggedBtnClicked = true;
    if (this.logInSubmitForm.invalid) {
      Object.values(this.logInSubmitForm.controls).forEach((control) => {
        control.markAsTouched();
      });
      this.loggedBtnClicked = false;
      return;
    }

    const userDetails: LogInUser = {
      email: this.emailControl.value!,
      password: this.userpasswordControl.value!,
    };

    this.logInUserSubscription$ = this._userService.logInUser(userDetails).subscribe({
      next: (response) => {
        if (response.statusCode == 200) {
          Swal.fire({
            title: 'Success',
            text: 'User logged in successfully!',
            icon: 'success',
            background: '#bcf1cd',
            timer: 4000,
            showConfirmButton: false,
          });

          localStorage.setItem('auth_token', response.token!);
          localStorage.setItem('user_email', response.email!);

          if (response.roles) {
            localStorage.setItem('user_role', JSON.stringify(response.roles));
          }

          if (response.productGroup) {
            localStorage.setItem('user_product_group', JSON.stringify(response.productGroup));
          }

          if (localStorage.getItem('auth_token') !== null) {
            this.router.navigate(['/panel/dashboard']);
          }
        } else if (response.statusCode == 500) {
          this.loggedBtnClicked = false;
          Swal.fire({
            title: 'Invalid Credentials',
            text: 'Email or password is incorrect. Please try again.',
            icon: 'error',
            showConfirmButton: true,
            background: '#fbdde2',
          });
        }
      },
      error: (error) => {
        this.loggedBtnClicked = false;
        Swal.fire({
          title: 'Error',
          text: 'There was an error logging the user. Please try again later.',
          icon: 'error',
          showConfirmButton: true,
          background: '#fbdde2',
        });
      },
    });
  };

  ngOnDestroy(): void {
    this.logInUserSubscription$?.unsubscribe();
  }
}
