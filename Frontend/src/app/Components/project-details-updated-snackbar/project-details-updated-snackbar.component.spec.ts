import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectDetailsUpdatedSnackbarComponent } from './project-details-updated-snackbar.component';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MAT_SNACK_BAR_DATA, MatSnackBarRef, MatSnackBarModule} from "@angular/material/snack-bar";
import {NO_ERRORS_SCHEMA} from "@angular/core";


describe('ProjectDetailsUpdatedSnackbarComponent', () => {
  let component: ProjectDetailsUpdatedSnackbarComponent;
  let fixture: ComponentFixture<ProjectDetailsUpdatedSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      declarations: [ ProjectDetailsUpdatedSnackbarComponent ],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_SNACK_BAR_DATA, useValue: {}},
        {provide: MatSnackBarRef, useValue: {}}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailsUpdatedSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
