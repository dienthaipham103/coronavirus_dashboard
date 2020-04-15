import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Barchart03Component } from './barchart03.component';

describe('Barchart03Component', () => {
  let component: Barchart03Component;
  let fixture: ComponentFixture<Barchart03Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Barchart03Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Barchart03Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
