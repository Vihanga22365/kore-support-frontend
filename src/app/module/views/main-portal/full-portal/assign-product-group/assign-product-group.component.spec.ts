import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignProductGroupComponent } from './assign-product-group.component';

describe('AssignProductGroupComponent', () => {
  let component: AssignProductGroupComponent;
  let fixture: ComponentFixture<AssignProductGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignProductGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignProductGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
