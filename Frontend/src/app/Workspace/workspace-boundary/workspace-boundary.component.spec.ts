import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceBoundaryComponent } from './workspace-boundary.component';

describe('WorkspaceBoundaryComponent', () => {
  let component: WorkspaceBoundaryComponent;
  let fixture: ComponentFixture<WorkspaceBoundaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkspaceBoundaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceBoundaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
