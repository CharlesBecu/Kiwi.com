import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarDeRechercheStyleeeeComponent } from './bar-de-recherche-styleeee.component';

describe('BarDeRechercheStyleeeeComponent', () => {
  let component: BarDeRechercheStyleeeeComponent;
  let fixture: ComponentFixture<BarDeRechercheStyleeeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarDeRechercheStyleeeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarDeRechercheStyleeeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
