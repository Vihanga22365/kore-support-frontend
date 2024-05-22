import { Component } from '@angular/core';

@Component({
  selector: 'app-view-severity',
  templateUrl: './view-severity.component.html',
  styleUrls: ['./view-severity.component.scss'],
})
export class ViewSeverityComponent {
  users = new Array(20);

  constructor() {
    $(function () {
      $('#datatable').DataTable(),
        $('#datatable-buttons')
          .DataTable({
            lengthChange: !1,
            buttons: ['copy', 'excel', 'pdf', 'colvis'],
          })
          .buttons()
          .container()
          .appendTo('#datatable-buttons_wrapper .col-md-6:eq(0)'),
        $('.dataTables_length select').addClass('form-select form-select-sm');
    });
  }
}
