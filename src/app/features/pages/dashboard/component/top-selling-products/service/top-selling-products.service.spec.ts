import { TestBed } from '@angular/core/testing';

import { TopSellingProductsService } from './top-selling-products.service';

describe('TopSellingProductsService', () => {
  let service: TopSellingProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopSellingProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
