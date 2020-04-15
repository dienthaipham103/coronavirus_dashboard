import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailLinechart01Component } from './detail-linechart01.component';

describe('DetailLinechart01Component', () => {
  let component: DetailLinechart01Component;
  let fixture: ComponentFixture<DetailLinechart01Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailLinechart01Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailLinechart01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
