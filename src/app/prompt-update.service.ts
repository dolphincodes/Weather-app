import {Injectable} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';

function promptUser(): boolean {
  return true;
}

@Injectable({
  providedIn: 'root'
})
export class PromptUpdateService {

  constructor(updates: SwUpdate) {
    updates.available.subscribe(event => {
      if (promptUser()) {
        updates.activateUpdate().then(() => document.location.reload());
      }
    });
  }
}
