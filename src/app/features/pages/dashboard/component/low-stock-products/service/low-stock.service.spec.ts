import { TestBed } from '@angular/core/testing';

import { LowStockService } from './low-stock.service';

describe('LowStockService', () => {
  let service: LowStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LowStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
