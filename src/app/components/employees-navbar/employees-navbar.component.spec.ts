import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesNavbarComponent } from './employees-navbar.component';

describe('EmployeesNavbarComponent', () => {
  let component: EmployeesNavbarComponent;
  let fixture: ComponentFixture<EmployeesNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeesNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
