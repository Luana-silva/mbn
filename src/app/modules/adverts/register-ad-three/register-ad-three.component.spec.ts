import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAdThreeComponent } from './register-ad-three.component';

describe('RegisterAdThreeComponent', () => {
  let component: RegisterAdThreeComponent;
  let fixture: ComponentFixture<RegisterAdThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterAdThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAdThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
