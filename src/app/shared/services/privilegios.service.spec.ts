import { TestBed } from '@angular/core/testing';

import { PrivilegiosService } from './privilegios.service';

describe('PrivilegiosService', () => {
  let service: PrivilegiosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrivilegiosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
