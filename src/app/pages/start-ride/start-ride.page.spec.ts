import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartRidePage } from './start-ride.page';

describe('StartRidePage', () => {
  let component: StartRidePage;
  let fixture: ComponentFixture<StartRidePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartRidePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartRidePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
