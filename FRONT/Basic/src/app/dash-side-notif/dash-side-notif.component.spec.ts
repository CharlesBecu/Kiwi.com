import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashSideNotifComponent } from './dash-side-notif.component';

describe('DashSideNotifComponent', () => {
  let component: DashSideNotifComponent;
  let fixture: ComponentFixture<DashSideNotifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashSideNotifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashSideNotifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
