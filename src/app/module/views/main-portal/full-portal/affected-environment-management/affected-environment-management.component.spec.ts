import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectedEnvironmentManagementComponent } from './affected-environment-management.component';

describe('AffectedEnvironmentManagementComponent', () => {
  let component: AffectedEnvironmentManagementComponent;
  let fixture: ComponentFixture<AffectedEnvironmentManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectedEnvironmentManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffectedEnvironmentManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
