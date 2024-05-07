import { Component } from '@angular/core';

@Component({
  selector: 'app-main-portal-nav-header',
  templateUrl: './main-portal-nav-header.component.html',
  styleUrls: ['./main-portal-nav-header.component.scss'],
})
export class MainPortalNavHeaderComponent {
  toggleSidebar = () => {
    var body = document.body;
    if (body.classList.contains('sidebar-enable')) {
      body.classList.remove('sidebar-enable', 'vertical-collapsed');
    } else {
      body.classList.add('sidebar-enable', 'vertical-collapsed');
    }
  };
}
