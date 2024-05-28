import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent {
  firstNameControl = new FormControl('', Validators.required);
  lastNameControl = new FormControl('', Validators.required);
  emailAddressControl = new FormControl('', Validators.required);
  phoneNumberControl = new FormControl('', Validators.required);
  passwordControl = new FormControl('', Validators.required);
  confirmPasswordControl = new FormControl('', Validators.required);
  userGroupControl = new FormControl('', Validators.required);

  userSubmitForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.userSubmitForm = this._formBuilder.group({
      firstName: this.firstNameControl,
      lastName: this.lastNameControl,
      emailAddress: this.emailAddressControl,
      phoneNumber: this.phoneNumberControl,
      password: this.passwordControl,
      confirmPassword: this.confirmPasswordControl,
      userGroup: this.userGroupControl,
    });
  }

  createUser = () => {
    if (this.userSubmitForm.invalid) {
      Object.values(this.userSubmitForm.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }

    
  };
}
