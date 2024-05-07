import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-portal-time-date',
  templateUrl: './main-portal-time-date.component.html',
  styleUrls: ['./main-portal-time-date.component.scss'],
})
export class MainPortalTimeDateComponent implements OnInit {
  currentTime!: string;
  currentDate!: string;
  private intervalId!: number;

  constructor(private datePipe: DatePipe) {}

  ngOnInit() {
    this.updateTime();
    this.intervalId = window.setInterval(() => this.updateTime(), 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
    }
  }

  private updateTime() {
    const transformedTime = this.datePipe.transform(new Date(), 'mediumTime', '-0600');
    this.currentTime = transformedTime ? transformedTime : '';

    const transformedDate = this.datePipe.transform(new Date(), 'fullDate', '-0600');
    this.currentDate = transformedDate ? transformedDate : '';
  }
}
