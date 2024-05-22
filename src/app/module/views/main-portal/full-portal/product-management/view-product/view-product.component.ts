import { Component } from '@angular/core';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss'],
})
export class ViewProductComponent {
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
