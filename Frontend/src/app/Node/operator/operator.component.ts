import {Component, Inject, Input, OnInit} from '@angular/core';
import {TFOperator, TFTensor} from "../../tf";
import {FormControl} from "@angular/forms";
import {DataService} from "../../data.service";
import * as LeaderLine from "leader-line-new";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.css']
})
export class OperatorComponent implements OnInit {

  selectedNodeX = new FormControl();
  selectedNodeY = new FormControl();

  @Input() _TFNodeDataOperator : TFOperator;

  constructor(public data: DataService, @Inject(DOCUMENT) private document) { }

  ngOnInit(): void {
  }

  // Initial linking between two node elements.
  linkNodes(selectedNode: FormControl) {

    if (this._TFNodeDataOperator?.name != undefined) {
      const lineStartName = this._TFNodeDataOperator.name.toString();
      const lineEndName = selectedNode.toString();
      const lineObj = new LeaderLine(
          this.document.getElementById(lineStartName),
          this.document.getElementById(lineEndName), {
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

      this.data.lineConnectorsList.push({
            start: lineStartName,
            end: lineEndName,
            line: lineObj,
          }
      );
    }}

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
