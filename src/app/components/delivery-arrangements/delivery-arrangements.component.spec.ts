import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryArrangementsComponent } from './delivery-arrangements.component';

describe('DeliveryArrangementsComponent', () => {
  let component: DeliveryArrangementsComponent;
  let fixture: ComponentFixture<DeliveryArrangementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryArrangementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryArrangementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
