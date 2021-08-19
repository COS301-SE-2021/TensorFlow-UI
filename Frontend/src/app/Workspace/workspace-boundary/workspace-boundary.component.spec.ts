import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceBoundaryComponent } from './workspace-boundary.component';
import {NgxsModule} from "@ngxs/store";
import {WorkspaceState} from "../../../Storage/workspace";

describe('WorkspaceBoundaryComponent', () => {
  let component: WorkspaceBoundaryComponent;
  let fixture: ComponentFixture<WorkspaceBoundaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([
          WorkspaceState
        ]),
      ],
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
