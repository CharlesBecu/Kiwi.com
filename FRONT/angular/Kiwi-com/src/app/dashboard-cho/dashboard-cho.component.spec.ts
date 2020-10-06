import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardChoComponent } from './dashboard-cho.component';

describe('DashboardChoComponent', () => {
  let component: DashboardChoComponent;
  let fixture: ComponentFixture<DashboardChoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardChoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardChoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
