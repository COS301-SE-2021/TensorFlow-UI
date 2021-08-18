import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SettingsPageData} from "../navbar/navbar.component";

@Component({
  selector: 'app-settings-page-dialog',
  templateUrl: './settings-page-dialog.component.html',
  styleUrls: ['./settings-page-dialog.component.css']
})
export class SettingsPageDialogComponent implements OnInit {

  public projectName: string;
  public projectDescription: string;
  constructor(public dialogRef: MatDialogRef<SettingsPageDialogComponent>,@Inject(MAT_DIALOG_DATA) public nodeData: SettingsPageData){

  }

  ngOnInit(): void {
  }

  saveDetails(){
    this.dialogRef.close();
    this.dialogRef.disableClose = true;
  }

  cancel(){
    this.dialogRef.close();
    this.dialogRef.disableClose = false;
  }
}
