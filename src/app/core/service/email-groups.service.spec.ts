import { TestBed } from '@angular/core/testing';

import { EmailGroupsService } from './email-groups.service';

describe('EmailGroupsService', () => {
  let service: EmailGroupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailGroupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
