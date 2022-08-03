import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstgramIconComponent } from './instgram-icon.component';

describe('InstgramIconComponent', () => {
  let component: InstgramIconComponent;
  let fixture: ComponentFixture<InstgramIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstgramIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstgramIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
