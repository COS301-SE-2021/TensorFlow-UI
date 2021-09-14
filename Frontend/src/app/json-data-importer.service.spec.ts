import { TestBed } from '@angular/core/testing';

import { JsonDataImporterService } from './json-data-importer.service';

describe('JsonDataImporterService', () => {
  let service: JsonDataImporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonDataImporterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
