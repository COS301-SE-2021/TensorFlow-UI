import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NodeData} from "../../node-data";

@Component({
  selector: 'app-node-element-delete-node-dialog',
  templateUrl: './node-element-delete-node-dialog.component.html',
  styleUrls: ['./node-element-delete-node-dialog.component.css']
})
export class NodeElementDeleteNodeDialogComponent implements OnInit {

  public removeNodeBool: boolean = false;
  constructor( public dialogRef: MatDialogRef<NodeElementDeleteNodeDialogComponent>, @Inject(MAT_DIALOG_DATA) public nodeData: NodeData) {
  }

  removeNode(){
    this.dialogRef.close();
    this.dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

}
