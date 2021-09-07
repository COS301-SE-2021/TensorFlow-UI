import { ComponentFixture, TestBed } from '@angular/core/testing';
import {NavbarComponent} from "./navbar.component";
import {NgxsModule, Store} from "@ngxs/store";
import {WorkspaceState} from "../../../Storage/workspace";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatMenuModule} from "@angular/material/menu";
import {MAT_SNACK_BAR_DATA, MatSnackBarModule, MatSnackBarRef} from "@angular/material/snack-bar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TFConstant, TFFill, TFNode} from "../../tf";


describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([
        WorkspaceState
      ]),MatMenuModule, MatSnackBarModule, MatDialogModule, BrowserAnimationsModule],
      declarations: [ NavbarComponent ],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_SNACK_BAR_DATA, useValue: {}},
        {provide: MatSnackBarRef, useValue: {}}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () =>{
   it('should populate TFNodeList and linesList arrays with store data', () => {

   })
  })

  // describe('clearCanvas', ()=>{
  //   it('should set the TFNode list to empty when clicked', () => {
  //     component.clearCanvas();
  //     // expect(component.TFNodeList).toHaveSize(0);
  //   })
  // })

  // describe('addNewNode', ()=>{
  //   it('should Add a new node to the store object and TFNodeList', ()=> {
  //     let tfNode: TFNode;
  //     tfNode = new TFConstant();
  //
  //     // let initialStore = this.store.selectSnapshot(WorkspaceState).TFNode;
  //     component.addNewNode(tfNode);
  //
  //     expect(component.TFNodeList.length).toBeGreaterThan(0);
  //
  //   })
  // })

  describe('createComponent', ()=>{
    it('should Add a new node to the store object and TFNodeList', ()=> {
      let tfNode: TFNode;
      tfNode = new TFConstant();

      // let initialStore = this.store.selectSnapshot(WorkspaceState).TFNode;
      component.createComponent("Fill");

      expect(component.TFNodeList.length).toBeGreaterThan(0)

    })
    it('should create object of the type provided as argument', ()=> {
      let tfNode: TFNode;
      tfNode = new TFConstant();

      // let initialStore = this.store.selectSnapshot(WorkspaceState).TFNode;
      component.createComponent("Constant");

      if(component.TFNodeList) {
        expect(component.TFNodeList[component.TFNodeList.length-1]).toBeInstanceOf(TFConstant);
      }
    })
  })
});
