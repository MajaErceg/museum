import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvePostavkeComponent } from './sve-postavke.component';

describe('SvePostavkeComponent', () => {
  let component: SvePostavkeComponent;
  let fixture: ComponentFixture<SvePostavkeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvePostavkeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvePostavkeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
