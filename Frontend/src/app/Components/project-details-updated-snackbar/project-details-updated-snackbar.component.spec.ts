import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectDetailsUpdatedSnackbarComponent } from './project-details-updated-snackbar.component';


describe('ProjectDetailsUpdatedSnackbarComponent', () => {
  let component: ProjectDetailsUpdatedSnackbarComponent;
  let fixture: ComponentFixture<ProjectDetailsUpdatedSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectDetailsUpdatedSnackbarComponent ]
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
