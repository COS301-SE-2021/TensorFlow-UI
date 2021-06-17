import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";

@Component({
  selector: 'app-edit-node-rhs',
  templateUrl: './edit-node-rhs.component.html',
  styleUrls: ['./edit-node-rhs.component.css']
})
export class EditNodeRHSComponent implements OnInit {
  @ViewChild("editdrawer") editdrawer: MatDrawer
  constructor() {}

  ngOnInit(): void {
  }

  toggle(){
    this.editdrawer.toggle();
  }


}
