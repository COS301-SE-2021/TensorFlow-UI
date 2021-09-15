import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListComponent } from './project-list.component';
import {NgxsModule} from "@ngxs/store";
import {WorkspaceState} from "../../../Storage/workspace";
import {TFNode} from "../../tf";

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([
        WorkspaceState
      ]),],
      declarations: [ ProjectListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('projectImport', ()=>{
    it('should call the API.importData(string) function and get the list of projects', ()=> {

      component.projectImport("Test4.json");

      expect(component).toBeTruthy()
    })
  })
});
