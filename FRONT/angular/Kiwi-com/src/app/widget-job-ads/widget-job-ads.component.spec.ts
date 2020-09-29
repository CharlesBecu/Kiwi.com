import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetJobAdsComponent } from './widget-job-ads.component';

describe('WidgetJobAdsComponent', () => {
  let component: WidgetJobAdsComponent;
  let fixture: ComponentFixture<WidgetJobAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetJobAdsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetJobAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
