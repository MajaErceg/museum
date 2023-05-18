import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirajObilazakComponent } from './biraj-obilazak.component';

describe('BirajObilazakComponent', () => {
  let component: BirajObilazakComponent;
  let fixture: ComponentFixture<BirajObilazakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BirajObilazakComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BirajObilazakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
