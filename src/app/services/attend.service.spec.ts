import { TestBed } from '@angular/core/testing';

import { AttendService } from './attend.service';

describe('AttendService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AttendService = TestBed.get(AttendService);
    expect(service).toBeTruthy();
  });
});
