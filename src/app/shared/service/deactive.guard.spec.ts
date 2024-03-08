import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { deactiveGuard } from './deactive.guard';

describe('deactiveGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => deactiveGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
