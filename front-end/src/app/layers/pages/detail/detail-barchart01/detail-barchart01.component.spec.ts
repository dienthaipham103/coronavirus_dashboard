import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBarchart01Component } from './detail-barchart01.component';

describe('DetailBarchart01Component', () => {
  let component: DetailBarchart01Component;
  let fixture: ComponentFixture<DetailBarchart01Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailBarchart01Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailBarchart01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
