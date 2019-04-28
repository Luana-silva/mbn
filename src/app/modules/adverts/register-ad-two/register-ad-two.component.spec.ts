import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAdTwoComponent } from './register-ad-two.component';

describe('RegisterAdTwoComponent', () => {
  let component: RegisterAdTwoComponent;
  let fixture: ComponentFixture<RegisterAdTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterAdTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAdTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
