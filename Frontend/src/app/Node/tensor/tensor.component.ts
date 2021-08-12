import {Component, Input, OnInit} from '@angular/core';
import * as node from "../index"
import {TFTensor} from "../../tf";

@Component({
	selector: 'app-tensor',
	templateUrl: './tensor.component.html',
	styleUrls: ['./tensor.component.css']
})
export class TensorComponent implements OnInit {
	set TFNodeData(value: TFTensor) {
		this._TFNodeData = value;
	}
	get TFNodeData(): TFTensor {
		return this._TFNodeData;
	}

	@Input() _TFNodeData : TFTensor;

	constructor() {
	}

	ngOnInit(): void {
	}

}