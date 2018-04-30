import { TestBed, inject } from '@angular/core/testing';

import { StopWatchService } from './stop-watch.service';

describe('StopWatchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StopWatchService]
    });
  });

  it('should be created', inject([StopWatchService], (service: StopWatchService) => {
    expect(service).toBeTruthy();
  }));
});
