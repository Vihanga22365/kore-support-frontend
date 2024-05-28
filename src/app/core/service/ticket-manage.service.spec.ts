import { TestBed } from '@angular/core/testing';

import { TicketManageService } from './ticket-manage.service';

describe('TicketManageService', () => {
  let service: TicketManageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketManageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
