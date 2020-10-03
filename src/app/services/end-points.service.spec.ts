import { TestBed } from '@angular/core/testing';

import { EndPointsService } from './end-points.service';

describe('EndPointsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EndPointsService = TestBed.get(EndPointsService);
    expect(service).toBeTruthy();
  });
});
