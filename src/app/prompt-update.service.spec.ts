import {TestBed} from '@angular/core/testing';

import {PromptUpdateService} from './prompt-update.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {SwUpdate, UpdateActivatedEvent, UpdateAvailableEvent} from '@angular/service-worker';
import {Observable, Subject} from 'rxjs';

describe('PromptUpdateService', () => {
  let service: PromptUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        {provide: SwUpdate, useClass: SwUpdateServerMock}
      ]
    });
    service = TestBed.inject(PromptUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

export class SwUpdateServerMock {
  public available: Observable<UpdateAvailableEvent> = new Subject();
  public activated: Observable<UpdateActivatedEvent> = new Subject();
  public isEnabled = false;

  public checkForUpdate(): Promise<void> {
    return new Promise((resolve) => resolve());
  }

  public activateUpdate(): Promise<void> {
    return new Promise((resolve) => resolve());
  }
}
