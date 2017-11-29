import { TestBed, inject } from '@angular/core/testing';

import { ScrapperService } from './scrapper.service';

describe('ScrapperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScrapperService]
    });
  });

  it('should ...', inject([ScrapperService], (service: ScrapperService) => {
    expect(service).toBeTruthy();
  }));
});
