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
}
