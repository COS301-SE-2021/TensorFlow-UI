import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NodeData} from "../../../node-data";
import {CodeGeneratorService} from "../../../code-generator.service";
import {WorkspaceState} from "../../../../Storage/workspace";
import {Store} from "@ngxs/store";

@Component({
  selector: 'app-running-dialog',
  templateUrl: './running-dialog.component.html',
  styleUrls: ['./running-dialog.component.css']
})
export class RunningDialogComponent implements OnInit {

  constructor(private store : Store, public dialogRef: MatDialogRef<RunningDialogComponent>,@Inject(MAT_DIALOG_DATA) public nodeData: NodeData) { }

  ngOnInit(): void {
    // insert logic for displaying output
    const codegen : CodeGeneratorService = new CodeGeneratorService(this.store);
    let output : string = "Uncomment me! running-dialog-component" // codegen.runfile(this.store.selectSnapshot(WorkspaceState).rootNode,"localhost:5000");
    let outputField = document.getElementById("codeOutputText");
    if (outputField != null)
      outputField.innerText = output;
  }

  close() {
    this.dialogRef.close();
  }
}
