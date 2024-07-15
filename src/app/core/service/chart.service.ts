import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { DashboardDataResponse, TicketWithWaitingTimeChartResponse, TimeSeverityChartResponse } from '../model/chart.model';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  constructor(private _httpClient: HttpClient) {}

  getTicketsWithSeverity = (startDate: string, endDate: string) => {
    return this._httpClient.get<TimeSeverityChartResponse[]>(`${environment.CHARTS_URL}/severity-count?startMonth=${startDate}&endMonth=${endDate}`);
  };

  getTicketsWithWaitingTime = (startDate: string, endDate: string) => {
    return this._httpClient.get<TicketWithWaitingTimeChartResponse[]>(`${environment.CHARTS_URL}/waiting-times?startMonth=${startDate}&endMonth=${endDate}`);
  };

  getDashboardData = () => {
    return this._httpClient.get<DashboardDataResponse>(`${environment.CHARTS_URL}/user/ticketCounts`);
  };
}
