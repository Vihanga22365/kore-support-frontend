import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import the 'HttpClient' class
import { CloseTicket, GetMessageResponse, GetTicketsResponse, ReopenTicket, Ticket, TicketResponse, WaitingTimeResponse } from '../model/ticket.model';
import { environment } from 'src/environments/environments';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketManageService {
  userType!: string;

  constructor(private _httpClient: HttpClient) {}

  createTicket = (ticket: FormData) => {
    return this._httpClient.post<TicketResponse>(environment.TICKET_URL, ticket);
  };

  getAllTickets = (fetchType: string) => {
    if (fetchType == 'normal') {
      const user_email = localStorage.getItem('user_email');

      if (user_email!.endsWith('@virtusa.com')) {
        this.userType = 'client';
      } else if (user_email!.endsWith('@kore.ai')) {
        this.userType = 'vendor';
      } else {
        this.userType = 'client';
      }

      if (this.userType === 'client') {
        return this._httpClient.get<GetTicketsResponse[]>(`${environment.TICKET_URL}/user/getAllTicketsByUser`);
      } else if (this.userType === 'vendor') {
        return this._httpClient.get<GetTicketsResponse[]>(`${environment.TICKET_URL}/getAllKore`);
      }
    } else if (fetchType == 'all') {
      return this._httpClient.get<GetTicketsResponse[]>(`${environment.TICKET_URL}/general/getAll`);
    } else if (fetchType == 'cc') {
      return this._httpClient.get<GetTicketsResponse[]>(`${environment.TICKET_URL}/by-cc-email`);
    } else {
      return this._httpClient.get<GetTicketsResponse[]>(`${environment.TICKET_URL}/severity/${fetchType}`);
    }

    return of([]);
  };

  getSingleTicket = (ticketNumber: string) => {
    return this._httpClient.get<GetTicketsResponse>(`${environment.TICKET_URL}/general/${ticketNumber}`);
  };

  createNewMessage = (ticketNumber: string, messageData: FormData) => {
    return this._httpClient.post(`${environment.TICKET_URL}/general/${ticketNumber}/CreateMessage`, messageData);
  };

  getAllMessages = (ticketNumber: string) => {
    return this._httpClient.get<GetMessageResponse[]>(`${environment.TICKET_URL}/general/getAllMessagesByTicketId/${ticketNumber}`);
  };

  createReopenTicket = (reopenTicket: ReopenTicket) => {
    return this._httpClient.post(`${environment.TICKET_URL}/general/reopen`, reopenTicket);
  };

  updateTicketStatus = (ticketNumber: string, closeTicketData: any, selectedStatus: string) => {
    if (selectedStatus == 'CLOSED') {
      return this._httpClient.put(`${environment.TICKET_URL}/general/${ticketNumber}/closeTicket`, closeTicketData);
    } else {
      return this._httpClient.put(`${environment.TICKET_URL}/general/${ticketNumber}/solve`, closeTicketData);
    }
  };

  getTicketMaxAttempts = (ticketNumber: number) => {
    return this._httpClient.get<number>(`${environment.TICKET_URL}/general/max-attempts/${ticketNumber}`);
  };

  getVendorWaitingTimeByAttempt = (ticketNumber: number, attempt: string) => {
    return this._httpClient.get<WaitingTimeResponse>(`${environment.TICKET_URL}/general/${ticketNumber}/open-duration/${attempt}`);
  };

  getClientWaitingTimeByAttempt = (ticketNumber: number, attempt: string) => {
    return this._httpClient.get<WaitingTimeResponse>(`${environment.TICKET_URL}/general/${ticketNumber}/clientTime/${attempt}`);
  };

  getSearchTicketId = (searchUser: string, searchResult: string, searchType: string) => {
    if (searchUser === 'admin') {
      if (searchType === 'id') {
        return this._httpClient.get<GetTicketsResponse[]>(`${environment.TICKET_URL}/general/searchByTicketId/${searchResult}`);
      } else {
        return this._httpClient.get<GetTicketsResponse[]>(`${environment.TICKET_URL}/general/searchByTicketSubject/${searchResult}`);
      }
    } else {
      if (searchType === 'id') {
        return this._httpClient.get<GetTicketsResponse[]>(`${environment.TICKET_URL}/searchTicketsByUser/${searchResult}`);
      } else {
        return this._httpClient.get<GetTicketsResponse[]>(`${environment.TICKET_URL}/searchTicketsByUserSubject/${searchResult}`);
      }
    }
  };
}
