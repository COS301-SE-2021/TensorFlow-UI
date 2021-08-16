import {Component, Inject, Input, OnInit} from '@angular/core';
import * as node from "../index"
import {TFTensor} from "../../tf";
import {DataService} from "../../data.service";
import * as LeaderLine from "leader-line-new";
import {DOCUMENT} from "@angular/common";

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

	constructor(public data: DataService, @Inject(DOCUMENT) private document) {
	}

	ngOnInit(): void {
	}

	// Redraw lines for each component.
	reload() {
		if (this.data?.lineConnectorsList != null) {
			if (this.data.lineConnectorsList.length > 0) {
				for (let i = 0; i < this.data.lineConnectorsList.length; i++) {

					const start = this.data.lineConnectorsList[i].start;
					let end = this.data.lineConnectorsList[i].end;
					this.data.lineConnectorsList[i].line?.remove();
					this.data.lineConnectorsList[i].line = new LeaderLine(
						this.document.getElementById(start),
						this.document.getElementById(end), {
							// size: 6,
							// outlineColor: '#red',
							// outline: true,
							// endPlugOutline: true,
							// dash: true,
							// path: 'arc',
							startSocket: 'auto',
							endSocket: 'auto'
						}

					);

				}
			}
		}
	}

}
