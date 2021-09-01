import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NodeData} from "../../node-data";

@Component({
  selector: 'app-node-delete-dialog',
  templateUrl: './node-delete-dialog.component.html',
  styleUrls: ['./node-delete-dialog.component.css']
})
export class NodeDeleteDialogComponent implements OnInit {

  public removeNodeBool: boolean = false;
  constructor( public dialogRef: MatDialogRef<NodeDeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public nodeData: NodeData) {
  }

  removeNode(){
    this.dialogRef.close();
    this.dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

}
