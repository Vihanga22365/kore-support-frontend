import { Component, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { Subscription } from 'rxjs';
import { ChartService } from 'src/app/core/service/chart.service';
import { DashboardDataResponse, TimeSeverityChartResponse } from 'src/app/core/model/chart.model';
import { error } from 'jquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  private rootMain!: am5.Root;
  startMonth!: string;
  endMonth!: string;
  startDate!: string;
  endDate!: string;

  chart!: am5xy.XYChart;
  root!: am5.Root;

  chart1!: am5xy.XYChart;
  rootChart1!: am5.Root;

  ticketsWithSeverityData: TimeSeverityChartResponse[] = [];
  ticketWithWaitingTimeData: any[] = [];

  getTicketsWithSeveritySubscription$!: Subscription;
  getTicketsWithWaitingTimeSubscription$!: Subscription;

  dashboardData!: DashboardDataResponse;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private zone: NgZone, private _chartService: ChartService) {
    this.ticketsWithSeverityData = [];
  }

  ngOnInit() {
    let date = new Date();
    this.endMonth = date.toISOString().slice(0, 7);
    date.setMonth(date.getMonth() - 0);
    this.startMonth = date.toISOString().slice(0, 7);

    let dateTwo = new Date();
    this.endDate = dateTwo.toISOString().slice(0, 7);
    dateTwo.setMonth(dateTwo.getMonth() - 0);
    this.startDate = dateTwo.toISOString().slice(0, 7);

    this.getTicketsWithSeverity();
    this.getTicketsWithWaitingTime();
    this.getDashboardData();
  }

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  getDashboardData = () => {
    this._chartService.getDashboardData().subscribe({
      next: (response) => {
        this.dashboardData = response;
        console.log(this.dashboardData);
      },
      error: (error) => {
        console.log(error);
      },
    });
  };

  getTicketsWithSeverity() {
    this.getTicketsWithSeveritySubscription$ = this._chartService.getTicketsWithSeverity(this.startMonth, this.endMonth).subscribe({
      next: (response) => {
        this.ticketsWithSeverityData = response;
        this.updateSeverityChart(response);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  ngAfterViewInit() {
    // Chart code goes in here
    this.browserOnly(() => {
      /* Chart 1 code */
      /* Chart 1 code */
      /* Chart 1 code */
      /* Chart 1 code */
      /* Chart 1 code */
      this.updateSeverityChart(this.ticketsWithSeverityData);
      /* Chart 1 code */
      /* Chart 1 code */
      /* Chart 1 code */
      /* Chart 1 code */
      /* Chart 1 code */

      /* Chart 2 code */
      /* Chart 2 code */
      /* Chart 2 code */
      /* Chart 2 code */
      /* Chart 2 code */
      this.updateWaitingTimeChart(this.ticketWithWaitingTimeData);
      /* Chart 2 code */
      /* Chart 2 code */
      /* Chart 2 code */
      /* Chart 2 code */
      /* Chart 2 code */
    });
  }

  getTicketsWithWaitingTime() {
    // this.ticketWithWaitingTimeData = [
    //   {
    //     year: 'Ticket 1',
    //     clientWaitingTime: 0.5,
    //     vendorWaitingTime: 2.5,
    //   },
    //   {
    //     year: 'Ticket 2',
    //     clientWaitingTime: 2.6,
    //     vendorWaitingTime: 2.7,
    //   },
    //   {
    //     year: 'Ticket 3',
    //     clientWaitingTime: 2.8,
    //     vendorWaitingTime: 2.9,
    //   },
    //   {
    //     year: 'Ticket 4',
    //     clientWaitingTime: 0.5,
    //     vendorWaitingTime: 2.5,
    //   },
    //   {
    //     year: 'Ticket 5',
    //     clientWaitingTime: 2.6,
    //     vendorWaitingTime: 2.7,
    //   },
    //   {
    //     year: 'Ticket 6',
    //     clientWaitingTime: 2.8,
    //     vendorWaitingTime: 2.9,
    //   },
    // ];
    // console.log(this._chartService.getTicketsWithWaitingTime(this.startDate, this.endDate));

    this._chartService.getTicketsWithWaitingTime(this.startDate, this.endDate).subscribe({
      next: (response) => {
        this.ticketWithWaitingTimeData = response.map((item) => {
          return {
            ticketId: `Ticket ${item.ticketId}`,
            clientWaitingTime: Number(item.clientWaitingTime),
            vendorWaitingTime: Number(item.vendorWaitingTime),
          };
        });
        this.updateWaitingTimeChart(this.ticketWithWaitingTimeData);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  updateWaitingTimeChart = (data1: any) => {
    console.log(data1);
    let rootChart1 = this.rootChart1;
    if (this.rootChart1) {
      rootChart1 = this.rootChart1;
      rootChart1.dispose();
    }

    this.rootChart1 = am5.Root.new('chartdiv1');
    rootChart1 = this.rootChart1;

    rootChart1.setThemes([am5themes_Animated.new(rootChart1)]);
    rootChart1._logo!.dispose();

    let chart1 = rootChart1.container.children.push(
      am5xy.XYChart.new(rootChart1, {
        panX: false,
        panY: false,
        wheelX: 'panX',
        wheelY: 'zoomX',
        paddingLeft: 0,
        layout: rootChart1.verticalLayout,
      })
    );

    chart1.set(
      'scrollbarX',
      am5.Scrollbar.new(rootChart1, {
        orientation: 'horizontal',
        width: am5.percent(98),
      })
    );

    chart1.set(
      'scrollbarY',
      am5.Scrollbar.new(rootChart1, {
        orientation: 'vertical',
        height: am5.percent(100),
      })
    );

    let xRenderer1 = am5xy.AxisRendererX.new(rootChart1, {
      minorGridEnabled: true,
    });
    let xAxis1 = chart1.xAxes.push(
      am5xy.CategoryAxis.new(rootChart1, {
        categoryField: 'ticketId',
        renderer: xRenderer1,
        tooltip: am5.Tooltip.new(rootChart1, {}),
      })
    );

    xRenderer1.grid.template.setAll({
      location: 1,
    });

    xAxis1.data.setAll(data1);

    let yAxis1 = chart1.yAxes.push(
      am5xy.ValueAxis.new(rootChart1, {
        min: 0,
        renderer: am5xy.AxisRendererY.new(rootChart1, {
          strokeOpacity: 0.1,
        }),
      })
    );

    let legend1 = chart1.children.push(
      am5.Legend.new(rootChart1, {
        centerX: am5.p50,
        x: am5.p50,
      })
    );

    function makeSeries1(name: string, fieldName: string) {
      let series = chart1.series.push(
        am5xy.ColumnSeries.new(rootChart1, {
          name: name,
          stacked: true,
          xAxis: xAxis1,
          yAxis: yAxis1,
          valueYField: fieldName,
          categoryXField: 'ticketId',
        })
      );

      series.columns.template.setAll({
        tooltipText: '{name}, {categoryX}: {valueY}',
        tooltipY: am5.percent(10),
      });
      series.data.setAll(data1);

      series.appear();

      series.bullets.push(function () {
        return am5.Bullet.new(rootChart1, {
          sprite: am5.Label.new(rootChart1, {
            fill: rootChart1.interfaceColors.get('alternativeText'),
            centerY: am5.p50,
            centerX: am5.p50,
            populateText: true,
          }),
        });
      });

      legend1.data.push(series);
    }

    makeSeries1('Client Waiting Time (Days)', 'clientWaitingTime');
    makeSeries1('Vendor Waiting Time (Days)', 'vendorWaitingTime');

    chart1.appear(1000, 100);
  };

  updateSeverityChart = (mainChartData: TimeSeverityChartResponse[]) => {
    let root = this.root;
    if (this.root) {
      root = this.root;
      root.dispose();
    }
    this.root = am5.Root.new('chartdiv');
    root = this.root;

    root.setThemes([am5themes_Animated.new(root)]);
    root._logo!.dispose();

    this.chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        paddingLeft: 0,
        wheelX: 'panX',
        wheelY: 'zoomX',
        layout: root.verticalLayout,
      })
    );

    this.chart.set(
      'scrollbarX',
      am5.Scrollbar.new(root, {
        orientation: 'horizontal',
        width: am5.percent(98),
      })
    );

    this.chart.set(
      'scrollbarY',
      am5.Scrollbar.new(root, {
        orientation: 'vertical',
        height: am5.percent(100),
      })
    );

    let legend = this.chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
      })
    );

    console.log(mainChartData);

    let xRenderer = am5xy.AxisRendererX.new(root, {
      cellStartLocation: 0.1,
      cellEndLocation: 0.9,
      minorGridEnabled: true,
    });

    let xAxis = this.chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'year',
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    xRenderer.grid.template.setAll({
      location: 1,
    });

    xAxis.data.setAll(mainChartData);

    let yAxis = this.chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1,
        }),
      })
    );

    const makeSeries = (name: string, fieldName: string) => {
      let series = this.chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: fieldName,
          categoryXField: 'year',
        })
      );

      series.columns.template.setAll({
        tooltipText: '{name} - {categoryX} : {valueY}',
        width: am5.percent(90),
        tooltipY: 0,
        strokeOpacity: 0,
      });

      series.data.setAll(mainChartData);

      series.appear();

      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationY: 0,
          sprite: am5.Label.new(root, {
            text: '{valueY}',
            fill: root.interfaceColors.get('alternativeText'),
            centerY: 0,
            centerX: am5.p50,
            populateText: true,
          }),
        });
      });

      legend.data.push(series);
    };

    makeSeries('Severity 1', 'severity1');
    makeSeries('Severity 2', 'severity2');
    makeSeries('Severity 3', 'severity3');
    makeSeries('Severity 4', 'severity4');

    this.chart.appear(1000, 100);
  };

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.rootMain) {
        this.rootMain.dispose();
      }
    });

    this.getTicketsWithSeveritySubscription$?.unsubscribe();
    this.getTicketsWithWaitingTimeSubscription$?.unsubscribe();
  }
}
