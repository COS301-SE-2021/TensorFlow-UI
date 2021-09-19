import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Store} from "@ngxs/store";
import {NodeData} from "../../../node-data";
import {RunningDialogComponent} from "../../../Components/running-dialog/running-dialog/running-dialog.component";

@Component({
  selector: 'app-tutorial-modal-material',
  templateUrl: './tutorial-modal-material.component.html',
  styleUrls: ['./tutorial-modal-material.component.css']
})


export class TutorialModalMaterialComponent implements OnInit {
  tutorialText : string;

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) tutorialData) {
    console.log(tutorialData + " coming from dialog");
    this.tutorialText = tutorialData;
  }

  ngOnInit(): void {
  }

  setText(text : string) {
    this.tutorialText = text;
  }

  close(){
    this.dialogRef.close();
    this.dialogRef.disableClose = false;
  }
}

export interface tutorialData {
  tutorialText : string;
}
