import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EksponatiComponent } from './eksponati.component';

describe('EksponatiComponent', () => {
  let component: EksponatiComponent;
  let fixture: ComponentFixture<EksponatiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EksponatiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EksponatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
