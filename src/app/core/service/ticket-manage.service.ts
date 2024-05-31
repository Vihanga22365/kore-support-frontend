import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import the 'HttpClient' class
import { CloseTicket, GetMessageResponse, GetTicketsResponse, ReopenTicket, Ticket, TicketResponse, WaitingTimeResponse } from '../model/ticket.model';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class TicketManageService {
  constructor(private _httpClient: HttpClient) {}

  createTicket = (ticket: FormData) => {
    return this._httpClient.post<TicketResponse>(environment.TICKET_URL, ticket);
  };

  getAllTickets = () => {
    return this._httpClient.get<GetTicketsResponse[]>(`${environment.TICKET_URL}/getAll`);
  };

  getSingleTicket = (ticketNumber: string) => {
    return this._httpClient.get<GetTicketsResponse>(`${environment.TICKET_URL}/${ticketNumber}`);
  };

  createNewMessage = (ticketNumber: string, messageData: FormData) => {
    return this._httpClient.post(`${environment.TICKET_URL}/${ticketNumber}/CreateMessage`, messageData);
  };

  getAllMessages = (ticketNumber: string) => {
    return this._httpClient.get<GetMessageResponse[]>(`${environment.TICKET_URL}/getAllMessagesByTicketId/${ticketNumber}`);
  };

  createReopenTicket = (reopenTicket: ReopenTicket) => {
    return this._httpClient.post(`${environment.TICKET_URL}/reopen`, reopenTicket);
  };

  updateTicketStatus = (ticketNumber: string, closeTicketData: CloseTicket) => {
    return this._httpClient.put(`${environment.TICKET_URL}/${ticketNumber}/closeTicket`, closeTicketData);
  };

  getTicketMaxAttempts = (ticketNumber: number) => {
    return this._httpClient.get<number>(`${environment.TICKET_URL}/max-attempts/${ticketNumber}`);
  };

  getWaitingTimeByAttempt = (ticketNumber: number, attempt: string) => {
    return this._httpClient.get<WaitingTimeResponse>(`${environment.TICKET_URL}/${ticketNumber}/open-duration/${attempt}`);
  };
}
