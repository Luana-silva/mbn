import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAdOneComponent } from './register-ad-one.component';

describe('RegisterAdOneComponent', () => {
  let component: RegisterAdOneComponent;
  let fixture: ComponentFixture<RegisterAdOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterAdOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAdOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
