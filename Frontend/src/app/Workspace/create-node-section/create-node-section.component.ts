import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {DataService} from "../../data.service";

@Component({
	selector: 'app-create-node-section',
	templateUrl: './create-node-section.component.html',
	styleUrls: ['./create-node-section.component.css']
})
export class CreateNodeSectionComponent implements OnInit { //HeroFormComponent

	createNodeBool: boolean;

	nodeName = new FormControl('');
	nodeType = new FormControl('');


	constructor(private data: DataService) {
		this.data.createNodeBoolean.subscribe(nodeBool => this.createNodeBool = nodeBool);

	}

	submitted = false;

	ngOnInit(): void {
	}

	onClickSubmit(data: any) {
		this.submitted = true;
		if (this.nodeName.value != "" && this.nodeType.value != "") {
			this.data.passFormDataToNode(this.nodeName.value, this.nodeType.value, "void");
		}
	}
}
