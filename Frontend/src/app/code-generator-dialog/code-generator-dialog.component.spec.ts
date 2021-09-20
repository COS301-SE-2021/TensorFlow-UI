import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeGeneratorDialogComponent } from './code-generator-dialog.component';

describe('CodeGeneratorDialogComponent', () => {
  let component: CodeGeneratorDialogComponent;
  let fixture: ComponentFixture<CodeGeneratorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeGeneratorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeGeneratorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
