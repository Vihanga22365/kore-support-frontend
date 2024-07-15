import { Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetTicketsResponse, searchTicketResponse } from 'src/app/core/model/ticket.model';
import { TicketManageService } from 'src/app/core/service/ticket-manage.service';

@Component({
  selector: 'app-main-portal-nav-header',
  templateUrl: './main-portal-nav-header.component.html',
  styleUrls: ['./main-portal-nav-header.component.scss'],
})
export class MainPortalNavHeaderComponent {
  getSearchTicketListSubscription$!: Subscription;

  showDropdown = false;
  selectedOption!: number;
  searchTerm = '';
  options: GetTicketsResponse[] = [];

  searchQuery!: string;

  userEmail!: string;
  userRole!: string[];
  searchUser!: string;

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.showDropdown = false;
    }
  }

  constructor(private eRef: ElementRef, private _ticketService: TicketManageService, private router: Router) {}

  ngOnInit(): void {
    this.userEmail = localStorage.getItem('user_email')!;
    this.checkUserRole();
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  filterOptions(event: Event): void {
    const searchData = (event.target as HTMLInputElement).value;

    if (searchData) {
      this.userRole.includes('ADMIN') ? (this.searchUser = 'admin') : (this.searchUser = 'user');

      this.getSearchTicketListSubscription$ = this._ticketService.getSearchTicketId(this.searchUser, searchData, 'id').subscribe({
        next: (response) => {
          if (response.length) {
            this.showDropdown = true;
          } else {
            this.showDropdown = false;
            this.filterBySearchText(this.searchUser, searchData, 'subject');
          }
          this.options = response;
        },
        error: (error) => {
          console.error(error);
        },
      });
    } else {
      this.showDropdown = false;
    }
  }

  filterBySearchText = (user: string, searchData: string, searchBy: string) => {
    if (searchData) {
      this.getSearchTicketListSubscription$ = this._ticketService.getSearchTicketId(user, searchData, searchBy).subscribe({
        next: (response) => {
          if (response.length) {
            this.showDropdown = true;
          } else {
            this.showDropdown = false;
          }
          this.options = response;
        },
        error: (error) => {
          console.error(error);
        },
      });
    } else {
      this.showDropdown = false;
    }
  };

  checkUserRole = () => {
    const user_role = localStorage.getItem('user_role');
    this.userRole = JSON.parse(user_role!);
  };

  selectOption(option: number): void {
    this.selectedOption = option;
    // this.searchTerm = this.options.filter((item) => item.ticketId === option)[0].ticketNumber;
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
