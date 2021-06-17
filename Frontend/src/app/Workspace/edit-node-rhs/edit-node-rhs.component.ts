import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-edit-node-rhs',
  templateUrl: './edit-node-rhs.component.html',
  styleUrls: ['./edit-node-rhs.component.css']
})
export class EditNodeRHSComponent implements OnInit {
  constructor() {}

  nodeName = new FormControl('');
  nodeType = new FormControl('');



  ngOnInit(): void {
  }

  onClickSubmit(data:any) {

  }

}
