import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogComponent} from "./dialog/dialog.component";

export interface DialogData {
  inputData: string[];
  inputCount: number;
}

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  input : string;

  ngOnInit(): void {
  }

  inputData: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {inputData: this.inputData}
    });

    dialogRef.afterClosed().subscribe(inputData => {
        this.inputData = inputData
    });
  }
  //ToDo: Add module for input so providers can be added for the Dialog
}
