export interface Ticket {
  emailAddress: string;
  ccEmailAddresses: string[];
  supportRequestType: string;
  subject: string;
  description: string;
  severity: string;
  product: string;
  installationType: string;
  affectedEnvironment: string;
  platformVersion: string;
  attachments: File[];
  referenceNumber: string | null;
}

export interface ReopenTicket {
  ticketId: number;
  sentBy: string;
  reason: string;
  ccEmailAddresses: string[];
}

export interface searchTicketResponse {
  ticketId: string;
  ticketNumber: string;
}

export interface CloseTicket {
  sentBy: string;
}

export interface WaitingTimeResponse {
  duration: string;
}

export interface TicketResponse {
  id: number;
  createdAt: string;
  emailAddress: string;
  ccEmailAddresses: string[];
  supportRequestType: string;
  subject: string;
  description: string;
  severity: string;
  product: string;
  installationType: string;
  affectedEnvironment: string;
  platformVersion: string;
  referenceNumber: string | null;
  slaBreach: boolean;
  delayedReply: boolean;
}

export interface GetTicketsResponse {
  id: number;
  createdAt: string;
  emailAddress: string;
  ccEmailAddresses: string[];
  supportRequestType: string;
  subject: string;
  description: string;
  severity: string;
  product: string;
  installationType: string;
  affectedEnvironment: string;
  platformVersion: string;
  clientStatus: string;
  vendorStatus: string;
  reopenReason: string | null;
  referenceNumber: string | null;
  slaBreach: boolean;
  delayedReply: boolean;
}

export interface GetMessageResponse {
  id: number;
  sentBy: string;
  sender: string;
  ccEmailAddresses: string[];
  content: string;
  createdAt: string;
  uniqueId: string;
  attachments: string[];
}
