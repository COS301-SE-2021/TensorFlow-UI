import {Component, ElementRef, Input, OnInit} from '@angular/core';
import * as d3 from 'd3';
interface LineData{
  x: number;
  y: number;
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @Input() data: LineData;
  private parentNativeElement : any;

  constructor(private element:ElementRef) {
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit(): void {
    var width = 300;
    var height = 300;
    var margin = {top: 10, right: 10, bottom: 30, left: 10}

    const svg = d3.create("svg");


  }


}
