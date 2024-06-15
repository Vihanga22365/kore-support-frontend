import { Component, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  private root!: am5.Root;
  startMonth!: string;
  endMonth!: string;
  startDate!: string;
  endDate!: string;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private zone: NgZone) {}

  ngOnInit() {
    let date = new Date();
    this.endMonth = date.toISOString().slice(0, 7);
    date.setMonth(date.getMonth() - 2);
    this.startMonth = date.toISOString().slice(0, 7);

    let today = new Date();
    let oneMonthAgo = new Date();

    oneMonthAgo.setMonth(today.getMonth() - 1);

    this.startDate = `${oneMonthAgo.getFullYear()}-${('0' + (oneMonthAgo.getMonth() + 1)).slice(-2)}-${('0' + oneMonthAgo.getDate()).slice(-2)}`;
    this.endDate = `${today.getFullYear()}-${('0' + (today.getMonth() + 1)).slice(-2)}-${('0' + today.getDate()).slice(-2)}`;
  }

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    // Chart code goes in here
    this.browserOnly(() => {
      /* Chart 1 code */
      /* Chart 1 code */
      /* Chart 1 code */
      /* Chart 1 code */
      /* Chart 1 code */

      let root = am5.Root.new('chartdiv');

      root.setThemes([am5themes_Animated.new(root)]);
      root._logo!.dispose();

      let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: false,
          panY: false,
          paddingLeft: 0,
          wheelX: 'panX',
          wheelY: 'zoomX',
          layout: root.verticalLayout,
        })
      );

      chart.set(
        'scrollbarX',
        am5.Scrollbar.new(root, {
          orientation: 'horizontal',
        })
      );

      let legend = chart.children.push(
        am5.Legend.new(root, {
          centerX: am5.p50,
          x: am5.p50,
        })
      );

      let data = [
        {
          year: '2024 Jan',
          severity1: 3,
          severity2: 5,
          severity3: 6,
          severity4: 2,
        },
        {
          year: '2024 Feb',
          severity1: 10,
          severity2: 7,
          severity3: 8,
          severity4: 5,
        },
        {
          year: '2024 Mar',
          severity1: 5,
          severity2: 8,
          severity3: 3,
          severity4: 6,
        },
        {
          year: '2024 Apr',
          severity1: 3,
          severity2: 5,
          severity3: 6,
          severity4: 2,
        },
        {
          year: '2024 May',
          severity1: 10,
          severity2: 7,
          severity3: 8,
          severity4: 5,
        },
        {
          year: '2024 June',
          severity1: 5,
          severity2: 8,
          severity3: 3,
          severity4: 6,
        },
      ];

      let xRenderer = am5xy.AxisRendererX.new(root, {
        cellStartLocation: 0.1,
        cellEndLocation: 0.9,
        minorGridEnabled: true,
      });

      let xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          categoryField: 'year',
          renderer: xRenderer,
          tooltip: am5.Tooltip.new(root, {}),
        })
      );

      xRenderer.grid.template.setAll({
        location: 1,
      });

      xAxis.data.setAll(data);

      let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {
            strokeOpacity: 0.1,
          }),
        })
      );

      function makeSeries(name: string, fieldName: string) {
        let series = chart.series.push(
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

        series.data.setAll(data);

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
      }

      makeSeries('Severity 1', 'severity1');
      makeSeries('Severity 2', 'severity2');
      makeSeries('Severity 3', 'severity3');
      makeSeries('Severity 4', 'severity4');

      chart.appear(1000, 100);

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
      // Create root element
      // Create root element
      // https://www.amcharts.com/docs/v5/getting-started/#Root_element
      let rootChart1 = am5.Root.new('chartdiv1');

      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/
      rootChart1.setThemes([am5themes_Animated.new(rootChart1)]);
      rootChart1._logo!.dispose();

      // Create chart
      // https://www.amcharts.com/docs/v5/charts/xy-chart/
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
        })
      );

      let data1 = [
        {
          year: 'Ticket 1',
          clientWaitingTime: 0.5,
          vendorWaitingTime: 2.5,
        },
        {
          year: 'Ticket 2',
          clientWaitingTime: 2.6,
          vendorWaitingTime: 2.7,
        },
        {
          year: 'Ticket 3',
          clientWaitingTime: 2.8,
          vendorWaitingTime: 2.9,
        },
        {
          year: 'Ticket 4',
          clientWaitingTime: 0.5,
          vendorWaitingTime: 2.5,
        },
        {
          year: 'Ticket 5',
          clientWaitingTime: 2.6,
          vendorWaitingTime: 2.7,
        },
        {
          year: 'Ticket 6',
          clientWaitingTime: 2.8,
          vendorWaitingTime: 2.9,
        },
      ];

      let xRenderer1 = am5xy.AxisRendererX.new(rootChart1, {
        minorGridEnabled: true,
      });
      let xAxis1 = chart1.xAxes.push(
        am5xy.CategoryAxis.new(rootChart1, {
          categoryField: 'year',
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

      // Add legend
      // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
      let legend1 = chart1.children.push(
        am5.Legend.new(rootChart1, {
          centerX: am5.p50,
          x: am5.p50,
        })
      );

      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      function makeSeries1(name: string, fieldName: string) {
        let series = chart1.series.push(
          am5xy.ColumnSeries.new(rootChart1, {
            name: name,
            stacked: true,
            xAxis: xAxis1,
            yAxis: yAxis1,
            valueYField: fieldName,
            categoryXField: 'year',
          })
        );

        series.columns.template.setAll({
          tooltipText: '{name}, {categoryX}: {valueY}',
          tooltipY: am5.percent(10),
        });
        series.data.setAll(data1);

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear();

        series.bullets.push(function () {
          return am5.Bullet.new(rootChart1, {
            sprite: am5.Label.new(rootChart1, {
              text: '{valueY}',
              fill: rootChart1.interfaceColors.get('alternativeText'),
              centerY: am5.p50,
              centerX: am5.p50,
              populateText: true,
            }),
          });
        });

        legend1.data.push(series);
      }

      makeSeries1('Client Waiting Time', 'clientWaitingTime');
      makeSeries1('Vendor Waiting Time', 'vendorWaitingTime');

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      chart1.appear(1000, 100);

      /* Chart 2 code */
      /* Chart 2 code */
      /* Chart 2 code */
      /* Chart 2 code */
      /* Chart 2 code */
    });
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.root) {
        this.root.dispose();
      }
    });
  }
}
