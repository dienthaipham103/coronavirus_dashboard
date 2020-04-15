import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Barchart02Component } from './barchart02.component';

describe('Barchart02Component', () => {
  let component: Barchart02Component;
  let fixture: ComponentFixture<Barchart02Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Barchart02Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Barchart02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
