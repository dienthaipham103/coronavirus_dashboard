import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Linechart00Component } from './linechart00.component';

describe('Linechart00Component', () => {
  let component: Linechart00Component;
  let fixture: ComponentFixture<Linechart00Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Linechart00Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Linechart00Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
