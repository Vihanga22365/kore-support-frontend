import { Component } from '@angular/core';

@Component({
  selector: 'app-main-portal',
  templateUrl: './main-portal.component.html',
  styleUrls: ['./main-portal.component.scss'],
})
export class MainPortalComponent {
  isFormOpen = false;
  message = '';

  openForm() {
    this.isFormOpen = true;
  }

  closeForm() {
    this.isFormOpen = false;
  }

  sendMessage() {
    // Implement your message sending logic
    console.log('Message sent:', this.message);
    this.message = ''; // Clear message input after sending
    this.closeForm(); // Optionally close the form
  }
}
