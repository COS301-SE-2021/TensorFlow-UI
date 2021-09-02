import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NodeData} from "../../../node-data";

@Component({
  selector: 'app-running-dialog',
  templateUrl: './running-dialog.component.html',
  styleUrls: ['./running-dialog.component.css']
})
export class RunningDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RunningDialogComponent>,@Inject(MAT_DIALOG_DATA) public nodeData: NodeData) { }

  ngOnInit(): void {
    // insert logic for displaying output
  }

  close() {
    this.dialogRef.close();
  }
}
