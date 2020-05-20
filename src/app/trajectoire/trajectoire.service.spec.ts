import { TestBed } from '@angular/core/testing';

import { TrajectoireService } from './trajectoire.service';

describe('TrajectoireService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrajectoireService = TestBed.get(TrajectoireService);
    expect(service).toBeTruthy();
  });
});
