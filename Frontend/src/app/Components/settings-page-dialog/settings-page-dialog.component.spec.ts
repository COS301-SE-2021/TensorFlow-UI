import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsPageDialogComponent } from './settings-page-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from "@angular/material/snack-bar";
import {NgxsModule} from "@ngxs/store";
import {WorkspaceState} from "../../../Storage/workspace";

describe('SettingsPageDialogComponent', () => {
  let component: SettingsPageDialogComponent;
  let fixture: ComponentFixture<SettingsPageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([
        WorkspaceState
      ])],
      declarations: [ SettingsPageDialogComponent ],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_SNACK_BAR_DATA, useValue: {}},
        {provide: MatSnackBarRef, useValue: {}}
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
