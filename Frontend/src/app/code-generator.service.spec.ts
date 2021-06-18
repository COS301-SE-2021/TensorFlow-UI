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

  it('a = 1', () => {
    let a : Node = new Node("a", "variable", null, null, "1", true, "a");
    expect(service.generateVariable(a)).toBe('a = 1');
  });
});
