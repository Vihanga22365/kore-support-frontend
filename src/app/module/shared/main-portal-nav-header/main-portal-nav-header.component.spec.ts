import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPortalNavHeaderComponent } from './main-portal-nav-header.component';

describe('MainPortalNavHeaderComponent', () => {
  let component: MainPortalNavHeaderComponent;
  let fixture: ComponentFixture<MainPortalNavHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPortalNavHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainPortalNavHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
