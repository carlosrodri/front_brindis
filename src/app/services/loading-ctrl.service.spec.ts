import { TestBed } from '@angular/core/testing';

import { LoadingCtrlService } from './loading-ctrl.service';

describe('LoadingCtrlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadingCtrlService = TestBed.get(LoadingCtrlService);
    expect(service).toBeTruthy();
  });
});
