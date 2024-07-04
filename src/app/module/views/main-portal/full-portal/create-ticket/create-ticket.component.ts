import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { files } from 'jszip';
import { Subscription } from 'rxjs';
import { Environment, InstallationType, Product, Severity, SupportRequestType } from 'src/app/core/model/enums.model';
import { ProductResponse } from 'src/app/core/model/product.model';
import { Ticket } from 'src/app/core/model/ticket.model';
import { EnumService } from 'src/app/core/service/enum.service';
import { ProductService } from 'src/app/core/service/product.service';
import { TicketManageService } from 'src/app/core/service/ticket-manage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss'],
})
export class CreateTicketComponent implements OnInit, OnDestroy {
  createTicketSubscription$!: Subscription;
  getProductsSubscription$!: Subscription;

  ccEmailControl = new FormControl();
  supportRequestTypeControl = new FormControl('', Validators.required);
  subjectControl = new FormControl('', Validators.required);
  descriptionControl = new FormControl('', Validators.required);
  severityControl = new FormControl('', Validators.required);
  productControl = new FormControl('', Validators.required);
  installationTypeControl = new FormControl('', Validators.required);
  affectedEnvironmentControl = new FormControl('', Validators.required);
  platformVersionControl = new FormControl('', Validators.required);

  products: Product[] = [];
  environments: Environment[] = [];
  severities: Severity[] = [];
  installationTypes: InstallationType[] = [];
  supportRequestTypes: SupportRequestType[] = [];
  productList: ProductResponse[] = [];

  createTicketSubmitBtnClicked: boolean = false;

  ticketSubmitForm!: FormGroup;

  //chipList
  inputValue: string = '';
  ccEmailValues: string[] = [];

  constructor(private _enumService: EnumService, private _formBuilder: FormBuilder, private _ticketService: TicketManageService, private _productService: ProductService) {}

  ngOnInit(): void {
    this.ticketSubmitForm = this._formBuilder.group({
      ccEmailAddresses: this.ccEmailControl,
      supportRequestType: this.supportRequestTypeControl,
      subject: this.subjectControl,
      description: this.descriptionControl,
      severity: this.severityControl,
      product: this.productControl,
      installationType: this.installationTypeControl,
      affectedEnvironment: this.affectedEnvironmentControl,
      platformVersion: this.platformVersionControl,
    });

    this.products = this._enumService.getProduct();
    this.environments = this._enumService.getEnvironment();
    this.severities = this._enumService.getSeverity();
    this.installationTypes = this._enumService.getInstallationType();
    this.supportRequestTypes = this._enumService.getSupportRequestType();
    this.getAllProducts();
  }

  // Start Dropzone Code
  files: File[] = [];
  maxFiles = 5;

  addValue() {
    const trimmedValue = this.inputValue;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (trimmedValue !== '' && !this.ccEmailValues.includes(trimmedValue) && emailPattern.test(trimmedValue)) {
      this.ccEmailValues.push(trimmedValue);
      this.inputValue = '';
    }
  }

  removeValue(value: string) {
    console.log(value);
    this.ccEmailValues = this.ccEmailValues.filter((val) => val !== value);
  }

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  // End Dropzone Code

  createTicket() {
    this.createTicketSubmitBtnClicked = true;
    let ccemails = this.ccEmailValues;
    const user_email = localStorage.getItem('user_email');

    if (this.ticketSubmitForm.invalid) {
      Object.values(this.ticketSubmitForm.controls).forEach((control) => {
        control.markAsTouched();
      });
      this.createTicketSubmitBtnClicked = false;
      return;
    }

    const formData = new FormData();
    formData.append('emailAddress', user_email!);
    formData.append('ccEmailAddresses', JSON.stringify(ccemails)); // Convert the array to a string
    formData.append('supportRequestType', this.supportRequestTypeControl.value!);
    formData.append('subject', this.subjectControl.value!);
    formData.append('description', this.descriptionControl.value!);
    formData.append('severity', this.severityControl.value!);
    formData.append('product', this.productControl.value!);
    formData.append('installationType', this.installationTypeControl.value!);
    formData.append('affectedEnvironment', this.affectedEnvironmentControl.value!);
    formData.append('platformVersion', this.platformVersionControl.value!);
    if (this.files.length > 0) {
      this.files.forEach((file) => {
        formData.append('attachments', file, file.name);
      });
    } else {
      const blob = new Blob(['[]'], { type: 'application/json' });
      formData.append('attachments', blob, 'empty.json');
    }

    this.createTicketSubscription$ = this._ticketService.createTicket(formData).subscribe({
      next: (response) => {
        const ticketFormResponse = response;
        if (ticketFormResponse.id) {
          this.ticketSubmitForm.reset();
          this.files = [];
          this.createTicketSubmitBtnClicked = false;
          Swal.fire({
            title: 'Success',
            text: 'Ticket created successfully!',
            icon: 'success',
            background: '#bcf1cd',
            showConfirmButton: true,
          });
        }
      },
      error: (error) => {
        this.createTicketSubmitBtnClicked = false;
        Swal.fire({
          title: 'Error',
          text: 'There was an error creating the ticket. Please try again later.',
          icon: 'error',
          showConfirmButton: true,
          background: '#fbdde2',
        });
      },
    });
  }

  getAllProducts = () => {
    this.getProductsSubscription$ = this._productService.getAllProducts().subscribe({
      next: (response) => {
        this.productList = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  };

  ngOnDestroy(): void {
    this.createTicketSubscription$?.unsubscribe();
    this.getProductsSubscription$?.unsubscribe();
  }
}
