import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  // BehaviorSubject to share textarea value (default empty string)
  private messageSource = new BehaviorSubject<string>('');
  message$ = this.messageSource.asObservable();

// BehaviorSubject to share textarea value (default empty string)
  private responseSource = new BehaviorSubject<string>('');
  responseSource$ = this.responseSource.asObservable();

  // Method to update the message value
  updateMessage(message: string) {
    this.messageSource.next(message);
  }

  getMessage(){
    return this.messageSource.value;
  }

  // Method to update the response value
  updateResponse(response: string) {
        this.responseSource.next(response);
  }

  getReponse(){
     return this.responseSource.value;
  }



}
