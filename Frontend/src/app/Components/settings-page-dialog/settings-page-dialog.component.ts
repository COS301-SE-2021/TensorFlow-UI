import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NodeData} from "../../node-data";
import {NavbarDialogsComponent} from "../navbar-dialogs/navbar-dialogs.component";

@Component({
  selector: 'app-settings-page-dialog',
  templateUrl: './settings-page-dialog.component.html',
  styleUrls: ['./settings-page-dialog.component.css']
})
export class SettingsPageDialogComponent implements OnInit {

  public projectName: string;
  public projectDescription: string;
  constructor(public dialogRef: MatDialogRef<NavbarDialogsComponent>,@Inject(MAT_DIALOG_DATA) public nodeData: NodeData){

  }

  ngOnInit(): void {
  }

  saveDetails(){
    this.dialogRef.close();
    this.dialogRef.disableClose = true;
  }

  cancel(){
    this.dialogRef.close();
  }
}
