import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInstallationTypeComponent } from './view-installation-type.component';

describe('ViewInstallationTypeComponent', () => {
  let component: ViewInstallationTypeComponent;
  let fixture: ComponentFixture<ViewInstallationTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInstallationTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewInstallationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
