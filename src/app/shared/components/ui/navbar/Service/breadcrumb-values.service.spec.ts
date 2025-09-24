import { TestBed } from '@angular/core/testing';

import { BreadcrumbValuesService } from './breadcrumb-values.service';

describe('BreadcrumbValuesService', () => {
  let service: BreadcrumbValuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreadcrumbValuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
