import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaljiObilaskaComponent } from './detalji-obilaska.component';

describe('DetaljiObilaskaComponent', () => {
  let component: DetaljiObilaskaComponent;
  let fixture: ComponentFixture<DetaljiObilaskaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetaljiObilaskaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetaljiObilaskaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
