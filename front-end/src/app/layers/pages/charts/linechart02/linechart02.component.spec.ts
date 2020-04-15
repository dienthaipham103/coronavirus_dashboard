import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Linechart02Component } from './linechart02.component';

describe('Linechart02Component', () => {
  let component: Linechart02Component;
  let fixture: ComponentFixture<Linechart02Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Linechart02Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Linechart02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
