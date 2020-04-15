import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Barchart00Component } from './barchart00.component';

describe('Barchart00Component', () => {
  let component: Barchart00Component;
  let fixture: ComponentFixture<Barchart00Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Barchart00Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Barchart00Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
