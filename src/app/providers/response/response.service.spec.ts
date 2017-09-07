import { TestBed, inject } from '@angular/core/testing';

import { ResponseService } from './response.service';

describe('ResponseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResponseService]
    });
  });

  it('should ...', inject([ResponseService], (service: ResponseService) => {
    expect(service).toBeTruthy();
  }));
});
