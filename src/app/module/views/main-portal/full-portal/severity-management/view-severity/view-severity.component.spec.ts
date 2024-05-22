import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSeverityComponent } from './view-severity.component';

describe('ViewSeverityComponent', () => {
  let component: ViewSeverityComponent;
  let fixture: ComponentFixture<ViewSeverityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSeverityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSeverityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
