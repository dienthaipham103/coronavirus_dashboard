import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBarchart03Component } from './detail-barchart03.component';

describe('DetailBarchart03Component', () => {
  let component: DetailBarchart03Component;
  let fixture: ComponentFixture<DetailBarchart03Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailBarchart03Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailBarchart03Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
