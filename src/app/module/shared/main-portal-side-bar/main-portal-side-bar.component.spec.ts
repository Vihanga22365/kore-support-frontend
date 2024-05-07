import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPortalSideBarComponent } from './main-portal-side-bar.component';

describe('MainPortalSideBarComponent', () => {
  let component: MainPortalSideBarComponent;
  let fixture: ComponentFixture<MainPortalSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPortalSideBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainPortalSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
