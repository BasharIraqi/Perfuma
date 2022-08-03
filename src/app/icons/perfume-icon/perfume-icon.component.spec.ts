import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfumeIconComponent } from './perfume-icon.component';

describe('PerfumeIconComponent', () => {
  let component: PerfumeIconComponent;
  let fixture: ComponentFixture<PerfumeIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfumeIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfumeIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
