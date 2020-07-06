import { TestBed } from '@angular/core/testing';

import { SlUtilsService } from './sl-utils.service';

describe('SlUtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SlUtilsService = TestBed.get(SlUtilsService);
    expect(service).toBeTruthy();
  });
});
