import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocUploadPage } from './doc-upload.page';

describe('DocUploadPage', () => {
  let component: DocUploadPage;
  let fixture: ComponentFixture<DocUploadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocUploadPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocUploadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
