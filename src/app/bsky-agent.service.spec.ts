import { TestBed } from '@angular/core/testing';

import { BskyAgentService } from './bsky-agent.service';

describe('BskyAgentService', () => {
  let service: BskyAgentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BskyAgentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
