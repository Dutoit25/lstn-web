import {CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {SharedDataService} from "../shared/shared.data.service";
import {MatButton} from "@angular/material/button";
import {EventService} from '../services/event-service.service';
import {environment} from "../../environments/environment.development";

@Component({
  selector: 'app-email-message-panel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatButton],
  templateUrl: './email-message-panel.component.html',
  styleUrl: '../app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmailMessagePanelComponent {

  emailContent: string = "Paste your message here or retrieve next email in queue...";
  from: string = '';
  subject: string = ''
  body: string = '';
  emailMessage: any = '';
  isStarted: boolean = false;
  isBtnDisabled = false;
  isRespBtnDisabled: boolean = false;
  backendUrl = "";
  path: string = "/lstn/email";

  @ViewChild('reponseButton') isResponseBtnDisabled!: ElementRef;
  @ViewChild('retrieveEmailButton') retrieveEmailButton!: ElementRef;

  constructor(private http: HttpClient,
              private sharedDataService: SharedDataService,
              private eventService: EventService) {
        this.backendUrl = environment.backendServiceUrl;
  }

  ngOnInit(): void {
    // Subscribe to response completion notification
    this.eventService.responseComplete$.subscribe({
      next: () => {
        this.isRespBtnDisabled = false;
        this.isResponseBtnDisabled.nativeElement.className = 'enabled-button';
      }
    });
  }


  onClick(): void {

    this.eventService.triggerClick();
  }

  removeInitalText(): void {
    if (!this.isStarted) {
      this.emailContent = "";
      this.isStarted = true
    }
  }

  onMessageChange() {
    this.sharedDataService.updateMessage(this.emailContent);
  }

  retrieveData() {
    this.retrieveEmailButton.nativeElement.className = 'disabled-button';
    this.removeInitalText();
    console.log(this.backendUrl + this.path);
    this.http.get(this.backendUrl + this.path)
      .subscribe({
        next: (res) => {
          console.log('Response from server:', res); // Log success response
          this.emailMessage = res;
          this.emailContent = this.emailMessage.from + '\n ' + '\n ' +
            +this.emailMessage.subject + '\n ' + this.emailMessage.body;
          this.sharedDataService.updateMessage(this.emailContent);
        },
        error: (error) => {
          this.isResponseBtnDisabled.nativeElement.className = 'disabled-button';
          this.isRespBtnDisabled = true;
          this.retrieveEmailButton.nativeElement.className = 'enabled-button'
          console.error('Error occurred:', error); // Log any errors
        },
        complete: () => {
          console.log('Request completed'); // (Optional) Log when request completes
          setTimeout(() => {
            this.retrieveEmailButton.nativeElement.className = 'enabled-button';
          }, 2000);
          console.log('Request completed'); // (Optional) Log when request completes
        }

      });
  }

}
