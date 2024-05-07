import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogPortalComponent } from './log-portal.component';

describe('LogPortalComponent', () => {
  let component: LogPortalComponent;
  let fixture: ComponentFixture<LogPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogPortalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
