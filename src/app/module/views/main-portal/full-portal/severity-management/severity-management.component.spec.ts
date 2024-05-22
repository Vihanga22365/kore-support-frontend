import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeverityManagementComponent } from './severity-management.component';

describe('SeverityManagementComponent', () => {
  let component: SeverityManagementComponent;
  let fixture: ComponentFixture<SeverityManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeverityManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeverityManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
