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
  getWaitingTimeByAttemptSubscription$!: Subscription;

  ticketList: GetTicketsResponse[] = [];
  reopenTicketId!: number;
  waitingTicketId!: number;
  maxAttempt!: number;
  finalWaitingTime!: WaitingTimeResponse | null;

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
    this.getAllTicketsData();
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
        this.getAllTicketsData();
        this.reopenTicketSubmitForm.reset();
        this.reopenSubmitBtnClicked = false;
        this.closeButton.nativeElement.click();
        Swal.fire({
          title: 'Success',
          text: 'Ticket reopen successfully!',
          icon: 'success',
          timer: 4000, // 4 seconds
          background: '#bcf1cd',
          showConfirmButton: false,
        });
      },
      error: (error) => {
        this.reopenSubmitBtnClicked = false;
        Swal.fire({
          title: 'Error',
          text: 'There was an error reopening the ticketss. Please try again later.',
          icon: 'error',
          timer: 4000, // 4 seconds
          showConfirmButton: false,
          background: '#fbdde2',
        });
      },
    });
  };

  getAllTicketsData = () => {
    this.getAllTicketsSubscription$ = this._ticketManageService.getAllTickets().subscribe({
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
    this.finalWaitingTime = null;
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

  getWaitingTimeByAttempt = (event: Event) => {
    this.finalWaitingTime = null;
    let attempt = (event.target as HTMLTextAreaElement).value;
    this.getWaitingTimeByAttemptSubscription$ = this._ticketManageService.getWaitingTimeByAttempt(this.waitingTicketId, attempt).subscribe({
      next: (response) => {
        this.finalWaitingTime = response;
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
    this.getWaitingTimeByAttemptSubscription$?.unsubscribe();
  }
}
