import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonUploadBoxComponent } from './json-upload-box.component';

describe('JsonUploadBoxComponent', () => {
  let component: JsonUploadBoxComponent;
  let fixture: ComponentFixture<JsonUploadBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsonUploadBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonUploadBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
