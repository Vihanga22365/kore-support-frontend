import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { TimeSeverityChartResponse } from '../model/chart.model';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  constructor(private _httpClient: HttpClient) {}

  getTicketsWithSeverity = (startDate: string, endDate: string) => {
    return this._httpClient.get<TimeSeverityChartResponse[]>(`${environment.CHARTS_URL}/severity-count?startMonth=${startDate}&endMonth=${endDate}`);
  };
}
