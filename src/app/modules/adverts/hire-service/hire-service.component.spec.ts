import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HireServiceComponent } from './hire-service.component';

describe('HireServiceComponent', () => {
  let component: HireServiceComponent;
  let fixture: ComponentFixture<HireServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HireServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HireServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
