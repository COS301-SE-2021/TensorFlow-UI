import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NodeData} from "../../node-data";

@Component({
  selector: 'app-navbar-dialogs',
  templateUrl: './navbar-dialogs.component.html',
  styleUrls: ['./navbar-dialogs.component.css']
})
export class NavbarDialogsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NavbarDialogsComponent>,@Inject(MAT_DIALOG_DATA) public nodeData: NodeData) { }

  ngOnInit(): void {
  }

  resetCanvas(){
    this.dialogRef.close();
    this.dialogRef.disableClose = true;
  }

  cancel(){
    this.dialogRef.close();
  }
}
