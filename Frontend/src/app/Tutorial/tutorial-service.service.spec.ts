import { TestBed } from '@angular/core/testing';

import { TutorialServiceService } from './tutorial-service.service';

describe('TutorialServiceService', () => {
  let service: TutorialServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TutorialServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
