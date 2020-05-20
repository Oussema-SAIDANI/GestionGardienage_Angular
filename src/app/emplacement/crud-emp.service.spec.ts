import { TestBed } from '@angular/core/testing';

import { CrudEmpService } from './crud-emp.service';

describe('CrudEmpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrudEmpService = TestBed.get(CrudEmpService);
    expect(service).toBeTruthy();
  });
});
