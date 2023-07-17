import { TestBed } from '@angular/core/testing';

import { ShortcutsKeysService } from './shortcuts-keys.service';

describe('ShortcutsKeysService', () => {
  let service: ShortcutsKeysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShortcutsKeysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
