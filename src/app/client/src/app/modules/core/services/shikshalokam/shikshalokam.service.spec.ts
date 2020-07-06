import { TestBed } from '@angular/core/testing';

import { ShikshalokamService } from './shikshalokam.service';

describe('ShikshalokamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShikshalokamService = TestBed.get(ShikshalokamService);
    expect(service).toBeTruthy();
  });
});
