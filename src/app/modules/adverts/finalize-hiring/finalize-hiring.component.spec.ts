import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizeHiringComponent } from './finalize-hiring.component';

describe('FinalizeHiringComponent', () => {
  let component: FinalizeHiringComponent;
  let fixture: ComponentFixture<FinalizeHiringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalizeHiringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizeHiringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
