import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialModalMaterialComponent } from './tutorial-modal-material.component';

describe('TutorialModalMaterialComponent', () => {
  let component: TutorialModalMaterialComponent;
  let fixture: ComponentFixture<TutorialModalMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorialModalMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialModalMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
