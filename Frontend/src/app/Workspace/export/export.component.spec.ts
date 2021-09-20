import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportComponent } from './export.component';
import {NgxsModule} from "@ngxs/store";
import {AddNodeToStorage, AddProjectName, WorkspaceState} from "../../../Storage/workspace";
import {MatMenuModule} from "@angular/material/menu";

describe('ExportComponent', () => {
  let component: ExportComponent;
  let fixture: ComponentFixture<ExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([
        WorkspaceState
      ]),MatMenuModule],
      declarations: [ ExportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('exportToPc', ()=>{
    it('exporting file to Local Storage (PC) without name', ()=> {
      let result = component.exportToPc();

      expect(result).toBeFalse();
    })
  })

  describe('exportToPc', ()=>{
    it('exporting file to Local Storage (PC) with name', ()=> {
      component.store.dispatch(new AddProjectName("test"));

      let result = component.exportToPc();

      expect(result).toBeTrue();
    })
  })

  describe('exportToLibrary', ()=>{
    it('exporting file to Library with Project Name written', ()=> {
      component.store.dispatch(new AddProjectName("test"));

      let result = component.exportToPc();
      expect(result).toBeTrue();
    })
  })

  describe('exportToLibrary', ()=>{
    it('exporting file to Library without Project Name', ()=> {

      let result = component.exportToPc();
      expect(result).toBeFalse();
    })
  })

  describe('createDoc', ()=>{
    it('Export data retrieved from store', ()=> {

      // let result = component.createDoc("test");
      // expect(result).toBeTruthy()
    })
  })
});
