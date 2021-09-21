import { ComponentFixture, TestBed } from '@angular/core/testing';
import {NavbarComponent} from "./navbar.component";
import {NgxsModule, Store} from "@ngxs/store";
import {WorkspaceState} from "../../../Storage/workspace";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatMenuModule} from "@angular/material/menu";
import {MAT_SNACK_BAR_DATA, MatSnackBarModule, MatSnackBarRef} from "@angular/material/snack-bar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TFAdd, TFNode} from "../../tf";
import {TFConstant} from "../../tf/tensor/common";
import {Command} from "../../../Command/Command";
import {ClearCanvasCommand} from "../../../Command/ClearCanvasCommand";
import {AddNodeCommand} from "../../../Command/AddNodeCommand";
import {LGraphNode} from "litegraph.js";


describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let navbar: NavbarComponent;
  let store: Store;

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
        {provide: MatSnackBarRef, useValue: {}},
        {provide: NavbarComponent, useClass: NavbarComponent }
      ]
    })
    .compileComponents();
    navbar = TestBed.inject(NavbarComponent);
    store = TestBed.inject(Store);
  });

  describe('clearCanvas', ()=>{
    it('should return true if the canvas has been cleared', () => {
      let com = new ClearCanvasCommand(store, navbar)
      expect(com.execute()).toBeTruthy();
    })
  })

  describe('addNewNode', ()=>{
    it('should Add a new node to the store object and TFNodeList', ()=> {
      let tfNode = new TFAdd("TestAdd", store);
      expect(tfNode.name).toEqual("TestAdd")
    })
  })

  describe('addNewNodeToList', ()=>{
    it('should Add a new node to the store object and TFNodeList', ()=> {
      let tfNode = new TFAdd("TestAdd", store);
      navbar.addNewNode(tfNode, new LGraphNode());
      expect(navbar.TFNodeList.length).toBeGreaterThan(0)
    })
  })
});
