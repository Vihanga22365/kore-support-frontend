import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import the 'HttpClient' class
import { GetMessageResponse, GetTicketsResponse, ReopenTicket, Ticket, TicketResponse } from '../model/ticket.model';
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
}
