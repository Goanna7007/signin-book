import { TestBed } from '@angular/core/testing';

import { DbAuthService } from './db-auth.service';

describe('DbAuthService', () => {
  let service: DbAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
