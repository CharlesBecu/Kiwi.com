import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullAdTextComponent } from './full-ad-text.component';

describe('FullAdTextComponent', () => {
  let component: FullAdTextComponent;
  let fixture: ComponentFixture<FullAdTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullAdTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullAdTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
