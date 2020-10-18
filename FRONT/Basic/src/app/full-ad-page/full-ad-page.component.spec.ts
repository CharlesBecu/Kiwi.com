import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullAdPageComponent } from './full-ad-page.component';

describe('FullAdPageComponent', () => {
  let component: FullAdPageComponent;
  let fixture: ComponentFixture<FullAdPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullAdPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullAdPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
