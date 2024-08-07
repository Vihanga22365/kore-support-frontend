import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { Status } from 'src/app/core/model/enums.model';
import { CloseTicket, GetMessageResponse, GetTicketsResponse } from 'src/app/core/model/ticket.model';
import { EnumService } from 'src/app/core/service/enum.service';
import { TicketManageService } from 'src/app/core/service/ticket-manage.service';
import { MessageTypeEnum, StatusEnum } from 'src/app/core/util/enums';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-single-ticket-manage',
  templateUrl: './single-ticket-manage.component.html',
  styleUrls: ['./single-ticket-manage.component.scss'],
})
export class SingleTicketManageComponent implements OnInit, AfterViewChecked, OnDestroy {
  getSingleTicketSubscription$!: Subscription;
  createNewMessageSubscription$!: Subscription;
  getAllMessagesSubscription$!: Subscription;
  updateTicketStatusSubscription$!: Subscription;

  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  ticketId!: string;
  ticketDetails!: GetTicketsResponse;
  messageList: GetMessageResponse[] = [];
  clientStatus: Status[] = [];
  userType!: string;
  emailAddress: string = '';
  ccEmails: string[] = [];

  sendMsgSubmitBtnClicked: boolean = false;
  changeStatusSubmitBtnClicked: boolean = false;

  statusControl = new FormControl('', Validators.required);
  closeReasonControl = new FormControl('', Validators.required);
  messagesControl = new FormControl();
  status: any;

  messageErrorStatus: boolean = false;
  hasScrolled: boolean = true;
  scrollCount: number = 0;

  msgSubmitForm!: FormGroup;
  changeStatusSubmitForm!: FormGroup;

  constructor(private _ticketManageService: TicketManageService, private _enumService: EnumService, private activeRoute: ActivatedRoute, private _formBuilder: FormBuilder, private router: Router) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.loadData();
    });
  }

  loadData() {
    this.ticketId = this.activeRoute.snapshot.paramMap.get('id')!;
    this.getSingleTicketData(this.ticketId);
    this.getAllMessages();
  }

  ngOnInit(): void {
    this.emailAddress = localStorage.getItem('user_email')!;
    this.userType = this.checkClientOrVendor(this.emailAddress);
    this.ticketId = this.activeRoute.snapshot.paramMap.get('id')!;
    this.getSingleTicketData(this.ticketId);
    this.getStatusList();
    this.msgSubmitForm = this._formBuilder.group({
      status: this.statusControl,
      messages: this.messagesControl,
    });
    this.changeStatusSubmitForm = this._formBuilder.group({
      status: this.statusControl,
      closeReason: this.closeReasonControl!,
    });
    this.getAllMessages();

    setInterval(() => {
      this.getAllMessages();
    }, 60000); // 1 minute in milliseconds
  }

  ngAfterViewChecked() {
    if (this.chatContainer && this.hasScrolled) {
      this.scrollToElement(this.chatContainer.nativeElement);
      this.scrollCount++;

      if (this.scrollCount > 2) {
        this.hasScrolled = false;
      }
    }
  }

  scrollToElement(element: HTMLElement): void {
    console.log(element);
    element.scrollIntoView({ behavior: 'smooth' });
  }

  changeStatusDetailsSubmit = () => {
    this.changeStatusSubmitBtnClicked = true;

    if (this.changeStatusSubmitForm.invalid) {
      Object.values(this.changeStatusSubmitForm.controls).forEach((control) => {
        control.markAsTouched();
      });
      this.changeStatusSubmitBtnClicked = false;
      return;
    }

    const selectedStatus = this.statusControl.value!;
    const closeReason = this.closeReasonControl.value;
    let data = {};

    if (selectedStatus == 'CLOSED') {
      data = {
        sentBy: this.emailAddress,
        closeTicketRequest: closeReason,
      };
    } else {
      data = {};
    }

    this.updateTicketStatusSubscription$ = this._ticketManageService.updateTicketStatus(this.ticketId, data, selectedStatus).subscribe({
      next: (response) => {
        this.getSingleTicketData(this.ticketId);
        this.changeStatusSubmitBtnClicked = false;
        Swal.fire({
          title: 'Success',
          text: 'Status updated successfully!',
          icon: 'success',
          background: '#bcf1cd',
          showConfirmButton: true,
        });
      },
      error: (error) => {
        this.changeStatusSubmitBtnClicked = false;
        Swal.fire({
          title: 'Error',
          text: 'There was an error updating the status. Please try again later.',
          icon: 'error',
          showConfirmButton: true,
          background: '#fbdde2',
        });
      },
    });
  };

  getAllMessages = () => {
    this.getAllMessagesSubscription$ = this._ticketManageService.getAllMessages(this.ticketId).subscribe({
      next: (response) => {
        // console.log(response);
        this.messageList = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  };

  sendMsg = () => {
    this.sendMsgSubmitBtnClicked = true;
    this.messageErrorStatus = false;
    if ((this.messagesControl.value === '' || this.messagesControl.value === null) && this.files.length == 0) {
      this.messageErrorStatus = true;
      this.sendMsgSubmitBtnClicked = false;
      return;
    }

    let ccemails = this.ccEmails;

    const formData = new FormData();
    formData.append('sentBy', this.emailAddress);
    formData.append('sender', this.checkClientOrVendor(this.emailAddress));
    formData.append('content', this.messagesControl.value);
    if (this.files.length > 0) {
      this.files.forEach((file) => {
        formData.append('attachments', file, file.name);
      });
    } else {
      const blob = new Blob([JSON.stringify([])], { type: 'application/json' });
      formData.append('attachments', blob, 'empty.json');
    }
    formData.append('ccEmailAddresses', JSON.stringify(ccemails));

    this.createNewMessageSubscription$ = this._ticketManageService.createNewMessage(this.ticketId, formData).subscribe({
      next: (response) => {
        this.messagesControl.setValue('');
        this.files = [];
        this.sendMsgSubmitBtnClicked = false;
        this.getAllMessages();
        Swal.fire({
          title: 'Success',
          text: 'Message sent successfully!',
          icon: 'success',
          background: '#bcf1cd',
          showConfirmButton: true,
        });
      },
      error: (error) => {
        this.sendMsgSubmitBtnClicked = false;
        Swal.fire({
          title: 'Error',
          text: 'There was an error sending the message. Please try again later.',
          icon: 'error',
          showConfirmButton: true,
          background: '#fbdde2',
        });
      },
    });
  };

  checkClientOrVendor = (emailAddress: string) => {
    let domain = emailAddress.split('@')[1];

    let msgType = '';

    if (domain === 'virtusa.com') {
      msgType = MessageTypeEnum.CLIENT;
    } else if (domain === 'kore.ai') {
      msgType = MessageTypeEnum.VENDOR;
    }

    return msgType;
  };

  getSingleTicketData = (ticketNumber: string) => {
    this.getSingleTicketSubscription$ = this._ticketManageService.getSingleTicket(ticketNumber).subscribe({
      next: (response) => {
        // console.log(response);
        if (response) {
          this.ticketDetails = response;
          this.ccEmails = response.ccEmailAddresses.map((email) => email.replace(/[\[\],"]/g, ''));
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  };

  showCloseReason: boolean = false; // This will control the visibility of the textarea

  onStatusChange(event: any) {
    const selectedValue = event.target.value;
    this.showCloseReason = selectedValue === 'CLOSED'; // Show textarea if 'close' is selected

    const selectedStatus = this.statusControl.value!;

    if (selectedStatus == 'CLOSED') {
      this.changeStatusSubmitForm.addControl('closeReason', this.closeReasonControl);
    } else {
      this.changeStatusSubmitForm.removeControl('closeReason');
    }
  }

  getStatusList = () => {
    this.clientStatus = this._enumService.getStatus().filter((status) => status.enumName !== StatusEnum.AWAITING_REPLY && status.enumName !== StatusEnum.OPEN);
  };

  getSupportTypeDisplayName(enumName: any): string {
    const supportRequestType = this._enumService.getSupportRequestType().find((type) => type.enumName === enumName);
    return supportRequestType ? supportRequestType.displayName : 'Unknown';
  }

  getSeverityDisplayName(enumName: any): string {
    const severity = this._enumService.getSeverity().find((type) => type.enumName === enumName);
    return severity ? severity.displayName : 'Unknown';
  }

  getStatusDisplayName(enumName: any): string {
    const status = this._enumService.getStatus().find((type) => type.enumName === enumName);
    return status ? status.displayName : 'Unknown';
  }

  getProductDisplayName(enumName: any): string {
    const product = this._enumService.getProduct().find((type) => type.enumName === enumName);
    return product ? product.displayName : 'Unknown';
  }

  getInstallationTypeDisplayName(enumName: any): string {
    const installationType = this._enumService.getInstallationType().find((type) => type.enumName === enumName);
    return installationType ? installationType.displayName : 'Unknown';
  }

  getAffectedEnvironmentDisplayName(enumName: any): string {
    const affectedEnvironment = this._enumService.getEnvironment().find((type) => type.enumName === enumName);
    return affectedEnvironment ? affectedEnvironment.displayName : 'Unknown';
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

  ngOnDestroy(): void {
    this.getSingleTicketSubscription$?.unsubscribe();
    this.createNewMessageSubscription$?.unsubscribe();
    this.getAllMessagesSubscription$?.unsubscribe();
    this.updateTicketStatusSubscription$?.unsubscribe();
  }
}
