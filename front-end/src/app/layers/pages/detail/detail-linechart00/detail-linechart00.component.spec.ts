import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailLinechart00Component } from './detail-linechart00.component';

describe('DetailLinechart00Component', () => {
  let component: DetailLinechart00Component;
  let fixture: ComponentFixture<DetailLinechart00Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailLinechart00Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailLinechart00Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
