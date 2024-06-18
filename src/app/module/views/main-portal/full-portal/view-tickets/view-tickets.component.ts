import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GetTicketsResponse, ReopenTicket, WaitingTimeResponse } from 'src/app/core/model/ticket.model';
import { EnumService } from 'src/app/core/service/enum.service';
import { TicketManageService } from 'src/app/core/service/ticket-manage.service';
import { SeverityEnum, SupportRequestTypeEnum } from 'src/app/core/util/enums';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-tickets',
  templateUrl: './view-tickets.component.html',
  styleUrls: ['./view-tickets.component.scss'],
})
export class ViewTicketsComponent implements OnInit, OnDestroy {
  @ViewChild('closeButton') closeButton!: ElementRef;
  @ViewChild('attemptDropdown') attemptDropdown!: ElementRef;

  getAllTicketsSubscription$!: Subscription;
  createReopenTicketSubscription$!: Subscription;
  getMaxAttemptsSubscription$!: Subscription;
  getVendorWaitingTimeByAttemptSubscription$!: Subscription;
  getClientWaitingTimeByAttemptSubscription$!: Subscription;

  ticketList: GetTicketsResponse[] = [];
  reopenTicketId!: number;
  waitingTicketId!: number;
  maxAttempt!: number;
  finalVendorWaitingTime!: WaitingTimeResponse | null;
  finalClientWaitingTime!: WaitingTimeResponse | null;
  userType!: string;
  userRole!: string;
  fetchTicketType!: string;
  severityDropDown!: string[];

  reopenSubmitBtnClicked: boolean = false;

  pages: number[] = [];
  currentPage = 1;
  totalPages = 100;
  displayPages = 1;

  reopenReasonControl = new FormControl('', Validators.required);

  reopenTicketSubmitForm!: FormGroup;

  constructor(private _ticketManageService: TicketManageService, private _enumService: EnumService, private _formBuilder: FormBuilder) {
    this.updatePages();
    this.reopenTicketSubmitForm = this._formBuilder.group({
      reopenReason: this.reopenReasonControl,
    });
  }

  ngOnInit(): void {
    this.getAllTicketsData('normal');
    this.checkClientOrVendor();
    this.checkUserRole();
  }

  reopenTicketDetailsSubmit = () => {
    this.reopenSubmitBtnClicked = true;

    if (this.reopenTicketSubmitForm.invalid) {
      Object.values(this.reopenTicketSubmitForm.controls).forEach((control) => {
        control.markAsTouched();
      });
      this.reopenSubmitBtnClicked = false;
      return;
    }

    const reopenTicket: ReopenTicket = {
      ticketId: this.reopenTicketId,
      sentBy: this.ticketList.filter((ticket) => ticket.id === this.reopenTicketId)[0].emailAddress,
      reason: this.reopenReasonControl.value!,
      ccEmailAddresses: this.ticketList.filter((ticket) => ticket.id === this.reopenTicketId)[0].ccEmailAddresses,
    };

    this.createReopenTicketSubscription$ = this._ticketManageService.createReopenTicket(reopenTicket).subscribe({
      next: (response) => {
        this.getAllTicketsData('normal');
        this.reopenTicketSubmitForm.reset();
        this.reopenSubmitBtnClicked = false;
        this.closeButton.nativeElement.click();
        Swal.fire({
          title: 'Success',
          text: 'Ticket reopen successfully!',
          icon: 'success',
          background: '#bcf1cd',
          showConfirmButton: true,
        });
      },
      error: (error) => {
        this.reopenSubmitBtnClicked = false;
        Swal.fire({
          title: 'Error',
          text: 'There was an error reopening the ticketss. Please try again later.',
          icon: 'error',
          showConfirmButton: true,
          background: '#fbdde2',
        });
      },
    });
  };

  checkClientOrVendor = () => {
    const user_email = localStorage.getItem('user_email');

    if (user_email!.endsWith('@virtusa.com')) {
      this.userType = 'client';
    } else if (user_email!.endsWith('@kore.ai')) {
      this.userType = 'vendor';
    } else {
      this.userType = 'client';
    }
  };

  checkUserRole = () => {
    const user_role = localStorage.getItem('user_role');
    this.userRole = user_role!;

    if (user_role == 'LEVEL-4') {
      this.severityDropDown = [SeverityEnum.SEVERITY_1, SeverityEnum.SEVERITY_2, SeverityEnum.SEVERITY_3, SeverityEnum.SEVERITY_4];
    } else if (user_role == 'LEVEL-3') {
      this.severityDropDown = [SeverityEnum.SEVERITY_2, SeverityEnum.SEVERITY_3, SeverityEnum.SEVERITY_4];
    } else if (user_role == 'LEVEL-2') {
      this.severityDropDown = [SeverityEnum.SEVERITY_3, SeverityEnum.SEVERITY_4];
    } else if (user_role == 'LEVEL-1') {
      this.severityDropDown = [SeverityEnum.SEVERITY_4];
    } else if (user_role == 'ADMIN') {
      this.severityDropDown = [SeverityEnum.SEVERITY_1, SeverityEnum.SEVERITY_2, SeverityEnum.SEVERITY_3, SeverityEnum.SEVERITY_4];
    }
  };

  getAllTicketsData = (fetchType: string) => {
    console.log(fetchType);
    this.fetchTicketType = fetchType;
    this.getAllTicketsSubscription$ = this._ticketManageService.getAllTickets(fetchType).subscribe({
      next: (response) => {
        this.ticketList = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  };

  reopenTicket = (reopenTicketId: number) => {
    this.reopenTicketId = reopenTicketId;
  };

  waitingTime = (waitingTicketId: number) => {
    this.attemptDropdown.nativeElement.value = '';
    this.finalVendorWaitingTime = null;
    this.finalClientWaitingTime = null;
    this.waitingTicketId = waitingTicketId;
    this.getMaxAttemptsSubscription$ = this._ticketManageService.getTicketMaxAttempts(this.waitingTicketId).subscribe({
      next: (response) => {
        this.maxAttempt = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  };

  getVendorWaitingTimeByAttempt = (event: Event) => {
    this.finalVendorWaitingTime = null;
    this.finalClientWaitingTime = null;
    let attempt = (event.target as HTMLTextAreaElement).value;
    this.getVendorWaitingTimeByAttemptSubscription$ = this._ticketManageService.getVendorWaitingTimeByAttempt(this.waitingTicketId, attempt).subscribe({
      next: (response) => {
        this.finalVendorWaitingTime = response;
        this.getClientWaitingTimeByAttempt(this.waitingTicketId, attempt);
      },
      error: (error) => {
        console.log(error);
      },
    });
  };

  getClientWaitingTimeByAttempt = (ticketId: number, attempt: string) => {
    this.getClientWaitingTimeByAttemptSubscription$ = this._ticketManageService.getClientWaitingTimeByAttempt(this.waitingTicketId, attempt).subscribe({
      next: (response) => {
        console.log(response);
        this.finalClientWaitingTime = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
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
    this.getAllTicketsSubscription$?.unsubscribe();
    this.createReopenTicketSubscription$?.unsubscribe();
    this.getMaxAttemptsSubscription$?.unsubscribe();
    this.getVendorWaitingTimeByAttemptSubscription$?.unsubscribe();
    this.getClientWaitingTimeByAttemptSubscription$?.unsubscribe();
  }
}
