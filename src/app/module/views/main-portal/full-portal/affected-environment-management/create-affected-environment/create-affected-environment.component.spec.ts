import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAffectedEnvironmentComponent } from './create-affected-environment.component';

describe('CreateAffectedEnvironmentComponent', () => {
  let component: CreateAffectedEnvironmentComponent;
  let fixture: ComponentFixture<CreateAffectedEnvironmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAffectedEnvironmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAffectedEnvironmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
