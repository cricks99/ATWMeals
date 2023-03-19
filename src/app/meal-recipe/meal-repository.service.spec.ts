import { TestBed } from '@angular/core/testing';

import { MealRepositoryService } from './meal-repository.service';

describe('MealRepositoryService', () => {
  let service: MealRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MealRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
