import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCadastreComponent } from './register-cadastre.component';

describe('RegisterCadastreComponent', () => {
  let component: RegisterCadastreComponent;
  let fixture: ComponentFixture<RegisterCadastreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterCadastreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCadastreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
