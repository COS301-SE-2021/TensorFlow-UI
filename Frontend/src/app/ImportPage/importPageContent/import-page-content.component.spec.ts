import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportPageContentComponent } from './import-page-content.component';

describe('ImportPageContentComponent', () => {
  let component: ImportPageContentComponent;
  let fixture: ComponentFixture<ImportPageContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportPageContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportPageContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
