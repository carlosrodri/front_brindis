import { TestBed } from '@angular/core/testing';

import { InterestedService } from './interested.service';

describe('InterestedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InterestedService = TestBed.get(InterestedService);
    expect(service).toBeTruthy();
  });
});
