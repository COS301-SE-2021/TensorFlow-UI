import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
import {TFAdd, TFGraph, TFOperator, TFSubtract, TFTensor} from "./tf";

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create and return operators', () => {
    let op1 : TFOperator = new TFAdd("o1");
    let op2 : TFOperator = new TFSubtract("o2");
    let array : TFOperator[] = new Array<TFOperator>();
    array.push(op1, op2);
    service.TFOperator[0] = op1;
    service.TFOperator[1] = op2;
    expect(service.TFOperator).toContain(op1, op2);
  });
});
