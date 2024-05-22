import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAffectedEnvironmentComponent } from './view-affected-environment.component';

describe('ViewAffectedEnvironmentComponent', () => {
  let component: ViewAffectedEnvironmentComponent;
  let fixture: ComponentFixture<ViewAffectedEnvironmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAffectedEnvironmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAffectedEnvironmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
