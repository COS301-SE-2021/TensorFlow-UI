import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarDialogsComponent} from './navbar-dialogs.component';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from "@angular/material/snack-bar";

describe('NavbarDialogsComponent', () => {
  let component: NavbarDialogsComponent;
  let fixture: ComponentFixture<NavbarDialogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarDialogsComponent ],
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
    fixture = TestBed.createComponent(NavbarDialogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});