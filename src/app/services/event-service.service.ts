import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {

  private responseComplete = new Subject<boolean>();
  responseComplete$ = this.responseComplete.asObservable();

  private clickEvent = new Subject<void>(); // Subject to emit events
  clickEvent$ = this.clickEvent.asObservable(); // Expose as observable

  triggerClick(): void {
    this.clickEvent.next(); // Emit the event
  }

// Method to notify that the process is finished
  notifyResponseComplete(): void {
    this.responseComplete.next(true); // Broadcast completion
  }

}
