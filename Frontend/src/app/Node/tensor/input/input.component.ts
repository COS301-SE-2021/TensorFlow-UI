import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "./dialog/dialog.component";
import {TFNode} from "../../../tf";

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
	input: string;

	ngOnInit(): void {
	}
	@Input() TFNodeData : TFNode;

	inputData: string;

	constructor(public dialog: MatDialog) {
	}

	openDialog(): void {
		const dialogRef = this.dialog.open(DialogComponent, {
			width: '250px',
			data: {inputData: this.inputData}
		});

		dialogRef.afterClosed().subscribe(inputData => {
			this.inputData = inputData
		});
	}
}
