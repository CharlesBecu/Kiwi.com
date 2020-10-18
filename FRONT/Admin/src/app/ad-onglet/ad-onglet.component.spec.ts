import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdOngletComponent } from './ad-onglet.component';

describe('AdOngletComponent', () => {
  let component: AdOngletComponent;
  let fixture: ComponentFixture<AdOngletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdOngletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdOngletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
