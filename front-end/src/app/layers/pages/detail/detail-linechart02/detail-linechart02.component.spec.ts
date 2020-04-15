import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailLinechart02Component } from './detail-linechart02.component';

describe('DetailLinechart02Component', () => {
  let component: DetailLinechart02Component;
  let fixture: ComponentFixture<DetailLinechart02Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailLinechart02Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailLinechart02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
