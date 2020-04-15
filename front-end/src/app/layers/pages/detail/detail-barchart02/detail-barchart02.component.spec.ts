import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBarchart02Component } from './detail-barchart02.component';

describe('DetailBarchart02Component', () => {
  let component: DetailBarchart02Component;
  let fixture: ComponentFixture<DetailBarchart02Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailBarchart02Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailBarchart02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
