export interface TimeSeverityChartResponse {
  severity1: number;
  severity2: number;
  severity3: number;
  severity4: number;
  year: string;
}
export interface TicketWithWaitingTimeChartResponse {
  vendorWaitingTime: number;
  clientWaitingTime: number;
  ticketId: string;
}
