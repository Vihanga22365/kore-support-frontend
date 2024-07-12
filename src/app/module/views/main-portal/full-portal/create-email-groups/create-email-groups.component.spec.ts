import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmailGroupsComponent } from './create-email-groups.component';

describe('CreateEmailGroupsComponent', () => {
  let component: CreateEmailGroupsComponent;
  let fixture: ComponentFixture<CreateEmailGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEmailGroupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEmailGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
