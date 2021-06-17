import { TestBed } from '@angular/core/testing';

import { CodeGeneratorService } from './code-generator.service';

describe('CodeGeneratorService', () => {
  let service: CodeGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
