import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalkSupplierComponent } from './talk-supplier.component';

describe('TalkSupplierComponent', () => {
  let component: TalkSupplierComponent;
  let fixture: ComponentFixture<TalkSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalkSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalkSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
