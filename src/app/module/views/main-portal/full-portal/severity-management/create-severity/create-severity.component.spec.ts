import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSeverityComponent } from './create-severity.component';

describe('CreateSeverityComponent', () => {
  let component: CreateSeverityComponent;
  let fixture: ComponentFixture<CreateSeverityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSeverityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSeverityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
