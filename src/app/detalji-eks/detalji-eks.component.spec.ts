import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaljiEksComponent } from './detalji-eks.component';

describe('DetaljiEksComponent', () => {
  let component: DetaljiEksComponent;
  let fixture: ComponentFixture<DetaljiEksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetaljiEksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetaljiEksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
