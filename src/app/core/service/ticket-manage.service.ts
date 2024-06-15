import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import the 'HttpClient' class
import { CloseTicket, GetMessageResponse, GetTicketsResponse, ReopenTicket, Ticket, TicketResponse, WaitingTimeResponse } from '../model/ticket.model';
import { environment } from 'src/environments/environments';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketManageService {
  constructor(private _httpClient: HttpClient) {}

  createTicket = (ticket: FormData) => {
    return this._httpClient.post<TicketResponse>(environment.TICKET_URL, ticket);
  };

  getAllTickets = () => {
    return this._httpClient.get<GetTicketsResponse[]>(`${environment.TICKET_URL}/general/getAll`);
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

  updateTicketStatus = (ticketNumber: string, closeTicketData: CloseTicket) => {
    return this._httpClient.put(`${environment.TICKET_URL}/general/${ticketNumber}/closeTicket`, closeTicketData);
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

  getSearchTicketId = (searchResult: string) => {
    return of(
      Array.from({ length: 10 }, (_, i) => ({
        ticketId: i + 1,
        ticketNumber: `Ticket Number ${i + 20}`,
      }))
    );
  };
}
