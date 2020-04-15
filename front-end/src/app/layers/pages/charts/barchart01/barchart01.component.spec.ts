import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Barchart01Component } from './barchart01.component';

describe('Barchart01Component', () => {
  let component: Barchart01Component;
  let fixture: ComponentFixture<Barchart01Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Barchart01Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Barchart01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
