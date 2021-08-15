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
  get inputCount(): number {
    return this._inputCount;
  }

  input : string;
  @Input() _inputCount : number;

  ngOnInit(): void {
  }

  inputData: string[];

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {inputData: this.inputData, inputCount: this._inputCount}
    });

    dialogRef.afterClosed().subscribe(inputData => {
      if (this._inputCount < 2) {
        this.inputData[0] = inputData[0]
      }
    });
  }
}
