import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInstallationTypeComponent } from './create-installation-type.component';

describe('CreateInstallationTypeComponent', () => {
  let component: CreateInstallationTypeComponent;
  let fixture: ComponentFixture<CreateInstallationTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateInstallationTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateInstallationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
