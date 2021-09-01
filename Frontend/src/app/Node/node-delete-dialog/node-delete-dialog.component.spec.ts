import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeDeleteDialogComponent } from './node-delete-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

describe('NodeDeleteDialogComponent', () => {
  let component: NodeDeleteDialogComponent;
  let fixture: ComponentFixture<NodeDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeDeleteDialogComponent ],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatDialogRef, useValue: {}},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
