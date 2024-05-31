import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { files } from 'jszip';
import { Subscription } from 'rxjs';
import { Environment, InstallationType, Product, Severity, SupportRequestType } from 'src/app/core/model/enums.model';
import { Ticket } from 'src/app/core/model/ticket.model';
import { EnumService } from 'src/app/core/service/enum.service';
import { TicketManageService } from 'src/app/core/service/ticket-manage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss'],
})
export class CreateTicketComponent implements OnInit, OnDestroy {
  createTicketSubscription$!: Subscription;

  ccEmailControl = new FormControl('', Validators.required);
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

  createTicketSubmitBtnClicked: boolean = false;

  ticketSubmitForm!: FormGroup;

  constructor(private _enumService: EnumService, private _formBuilder: FormBuilder, private _ticketService: TicketManageService) {}

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
  }

  // Start Dropzone Code
  files: File[] = [];
  maxFiles = 5;

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
    if (this.ticketSubmitForm.invalid) {
      Object.values(this.ticketSubmitForm.controls).forEach((control) => {
        control.markAsTouched();
      });
      this.createTicketSubmitBtnClicked = false;
      return;
    }

    let ccemails = ['ablackhat894@gmail.com', 'imilamaheshan30@gmail.com', 'asamarakoon9697@gmail.com'];

    const formData = new FormData();
    formData.append('emailAddress', 'vihangamihirangaz1@gmail.com');
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
            timer: 4000, // 4 seconds
            background: '#bcf1cd',
            showConfirmButton: false,
          });
        }
      },
      error: (error) => {
        this.createTicketSubmitBtnClicked = false;
        Swal.fire({
          title: 'Error',
          text: 'There was an error creating the ticket. Please try again later.',
          icon: 'error',
          timer: 4000, // 4 seconds
          showConfirmButton: false,
          background: '#fbdde2',
        });
      },
    });
  }

  ngOnDestroy(): void {
    this.createTicketSubscription$?.unsubscribe();
  }
}
