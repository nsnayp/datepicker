import { TestBed } from '@angular/core/testing';

import { DatepickerService } from './datepicker.service';

describe('DatepickerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatepickerService = TestBed.get(DatepickerService);
    expect(service).toBeTruthy();
  });
});
