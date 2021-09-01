import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeElementDeleteNodeDialogComponent } from './node-element-delete-node-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from "@angular/material/snack-bar";

describe('NodeElementDeleteNodeDialogComponent', () => {
  let component: NodeElementDeleteNodeDialogComponent;
  let fixture: ComponentFixture<NodeElementDeleteNodeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeElementDeleteNodeDialogComponent ],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatDialogRef, useValue: {}},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeElementDeleteNodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
