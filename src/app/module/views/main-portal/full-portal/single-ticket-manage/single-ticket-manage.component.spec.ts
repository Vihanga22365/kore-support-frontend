import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTicketManageComponent } from './single-ticket-manage.component';

describe('SingleTicketManageComponent', () => {
  let component: SingleTicketManageComponent;
  let fixture: ComponentFixture<SingleTicketManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleTicketManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleTicketManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
