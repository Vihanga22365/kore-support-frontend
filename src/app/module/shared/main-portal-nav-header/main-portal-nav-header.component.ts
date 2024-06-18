import { Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { searchTicketResponse } from 'src/app/core/model/ticket.model';
import { TicketManageService } from 'src/app/core/service/ticket-manage.service';

@Component({
  selector: 'app-main-portal-nav-header',
  templateUrl: './main-portal-nav-header.component.html',
  styleUrls: ['./main-portal-nav-header.component.scss'],
})
export class MainPortalNavHeaderComponent {
  getSearchTicketListSubscription$!: Subscription;

  showDropdown = false;
  selectedOption = '';
  searchTerm = '';
  options: searchTicketResponse[] = [];

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.showDropdown = false;
    }
  }

  constructor(private eRef: ElementRef, private _ticketService: TicketManageService, private router: Router) {}

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  filterOptions(event: Event): void {
    const searchData = (event.target as HTMLInputElement).value;

    if (searchData) {
      this.getSearchTicketListSubscription$ = this._ticketService.getSearchTicketId(searchData).subscribe({
        next: (response) => {
          if (response.length) {
            this.showDropdown = true;
          } else {
            this.showDropdown = false;
          }
          this.options = response.map((item) => ({ ...item, ticketId: item.ticketId.toString() }));
          console.log(response);
        },
        error: (error) => {
          console.error(error);
        },
      });
    } else {
      this.showDropdown = false;
    }
  }

  selectOption(option: string): void {
    this.selectedOption = option;
    this.searchTerm = this.options.filter((item) => item.ticketId === option)[0].ticketNumber;
    this.showDropdown = false;
    this.router.navigate(['/panel/manage-ticket', option]);
  }

  toggleSidebar = () => {
    var body = document.body;
    if (body.classList.contains('sidebar-enable')) {
      body.classList.remove('sidebar-enable', 'vertical-collapsed');
    } else {
      body.classList.add('sidebar-enable', 'vertical-collapsed');
    }
  };

  logOutUser = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_product_group');

    if (localStorage.getItem('auth_token') === null) {
      this.router.navigate(['/auth/login']);
    }
  };

  ngOnDestroy(): void {
    this.getSearchTicketListSubscription$?.unsubscribe();
  }
}
