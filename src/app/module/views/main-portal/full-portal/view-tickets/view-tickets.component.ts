import { Component } from '@angular/core';

@Component({
  selector: 'app-view-tickets',
  templateUrl: './view-tickets.component.html',
  styleUrls: ['./view-tickets.component.scss'],
})
export class ViewTicketsComponent {
  items = new Array(20);

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
