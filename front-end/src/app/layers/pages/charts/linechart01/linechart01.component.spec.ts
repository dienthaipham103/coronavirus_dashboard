import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Linechart01Component } from './linechart01.component';

describe('Linechart01Component', () => {
  let component: Linechart01Component;
  let fixture: ComponentFixture<Linechart01Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Linechart01Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Linechart01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
