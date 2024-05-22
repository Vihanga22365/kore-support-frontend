import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallationTypeManagementComponent } from './installation-type-management.component';

describe('InstallationTypeManagementComponent', () => {
  let component: InstallationTypeManagementComponent;
  let fixture: ComponentFixture<InstallationTypeManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstallationTypeManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstallationTypeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
