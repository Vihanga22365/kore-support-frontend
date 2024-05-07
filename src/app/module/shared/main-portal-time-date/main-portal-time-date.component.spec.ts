import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPortalTimeDateComponent } from './main-portal-time-date.component';

describe('MainPortalTimeDateComponent', () => {
  let component: MainPortalTimeDateComponent;
  let fixture: ComponentFixture<MainPortalTimeDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPortalTimeDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainPortalTimeDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
