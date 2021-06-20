import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { DiagramComponent, Diagram, NodeModel, ConnectorModel, PointModel } from '@syncfusion/ej2-angular-diagrams';

@Component({
  selector: 'app-line-connector',
  templateUrl: './line-connector.component.html',
  styleUrls: ['./line-connector.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LineConnectorComponent implements OnInit {

  @ViewChild("diagram")
  public diagram: DiagramComponent;
  public sourcePoint: PointModel;
  public targetPoint: PointModel;
  ngOnInit(): void {
    this.sourcePoint = { x: 100, y: 100 };
    this.targetPoint = { x: 200, y: 200 };
  }
  /*This is a child component for the line connector for the connection of nodes*/

  // @ts-ignore
  public getConnectorDefaults(obj: ConnectorModel): ConnectorModel { //TODO remove ignore
    obj.style = {
      strokeColor: '#6BA5D7',
      fill: '#6BA5D7',
      strokeWidth: 2
    }
    obj.targetDecorator = {
      style: {
        fill: '#6BA5D7',
        strokeColor: '#6BA5D7'
      }
    }
  }
}
