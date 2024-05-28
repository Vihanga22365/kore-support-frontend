import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetTicketsResponse } from 'src/app/core/model/ticket.model';
import { EnumService } from 'src/app/core/service/enum.service';
import { TicketManageService } from 'src/app/core/service/ticket-manage.service';
import { SeverityEnum, SupportRequestTypeEnum } from 'src/app/core/util/enums';

@Component({
  selector: 'app-view-tickets',
  templateUrl: './view-tickets.component.html',
  styleUrls: ['./view-tickets.component.scss'],
})
export class ViewTicketsComponent implements OnInit, OnDestroy {
  getAllTicketsSubscription$!: Subscription;

  ticketList: GetTicketsResponse[] = [];

  pages: number[] = [];
  currentPage = 1;
  totalPages = 100;
  displayPages = 1;

  constructor(private _ticketManageService: TicketManageService, private _enumService: EnumService) {
    this.updatePages();
  }

  ngOnInit(): void {
    this.getAllTicketsData();
  }

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
  }
}
