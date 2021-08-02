import { TestBed } from '@angular/core/testing';

import { CodeGeneratorService } from './code-generator.service';
import {Node} from "./Node/node";

describe('CodeGeneratorService', () => {
  let service: CodeGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  // basic variable assignment code
  it('a = 1', () => {
    let a : Node = new Node("a", "variable", null, null, "1", true, "a");
    let b : Node = new Node("b", "variable", null, null, "1", true, "b");
    console.log(service.generateVariable(b));
    expect(service.generateVariable(a)).toBe('a = 1');
  });

  //test using functions
  it('a = getNumber()', () => {
    let a : Node = new Node("a", "variable", null,  null, "getNumber()", true, "a");
    let output : string = service.generateCode(a);
    console.log(output);
    expect(output).toBe('a = getNumber()');
  });

  //purely functional test
  it("performTasks(a)", () => {
    let consoleOut : string = "";
    console.log("test started");
    let a : Node = new Node("a", "variable", null,  null, "getNumber()", true, "a");
    console.log("a created");
    consoleOut += service.generateCode(a) + '\n';
    let performTasks : Node = new Node("performTasks", "function", a, null, "a", true, "print('hi')");
    console.log("performTasks created");
    let output = service.generateCode(performTasks) + '\n';
    console.log("performTasks code generated");
    output += consoleOut;
    console.log(consoleOut);
    expect(output).toBe("performTasks(a)");
  });

  //stringing things together test
  it("import numpy\na = 1\nb = 2\nnumpy.add(a, b)", () => {
    let a : Node = new Node("a", "variable", null, null, "1", true, "a");
    let b : Node = new Node("b", "variable", null, null, "2", true, "b");
    let numpy : Node = new Node("numpy", "library", null, null, null, true, "import numpy")
    
  })
});
