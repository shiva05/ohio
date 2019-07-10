import { TestBed } from '@angular/core/testing';

import { SearchSchoolStandardsService } from './search-school-standards.service';

describe('SearchSchoolStandardsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchSchoolStandardsService = TestBed.get(SearchSchoolStandardsService);
    expect(service).toBeTruthy();
  });
});
