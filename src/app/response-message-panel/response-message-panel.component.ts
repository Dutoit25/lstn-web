import {CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, Input, ViewChild, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SharedDataService} from "../shared/shared.data.service";
import {EventService} from '../services/event-service.service';
import {environment} from "../../environments/environment.development";

@Component({
  selector: 'app-response-message-panel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './response-message-panel.component.html',
  styleUrl: '../app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ResponseMessagePanelComponent implements OnInit {
  responseContent: string = '';
  answerDTO: any = '';
  backendUrl = "";
  path = "/lstn/prompts";
  constructor(private http: HttpClient,
              private sharedDataService: SharedDataService,
              private eventService: EventService){
    this.backendUrl = environment.backendServiceUrl;
    this.responseContent = '';
  }

  ngOnInit(): void {
    this.eventService.clickEvent$.subscribe(() => {
      this.retrieveResponse();
      setTimeout(() => {

      }, 1000);
    });
  }

  retrieveResponse() {
    this.responseContent = "Getting info from server.."
    // this.isBtnDisabled = true;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    console.log('JSON Data to Send:', this.responseContent); //
    //this.isButtonDisabled = false
    this.http.post(this.backendUrl + this.path, this.sharedDataService.getMessage(), {headers})
      .subscribe({
        next: (res) => {
          console.log('Response from server:', res); // Log success response
          this.answerDTO = res;
          this.responseContent = this.answerDTO.answer;
          this.sharedDataService.updateResponse(this.responseContent);
        },
        error: (error) => {
          console.error('Error occurred:', error); // Log any errors
        },
        complete: () => {
          setTimeout(() => {
            console.log("Finish Retrieve response data");
            // Notify that the process is complete
            this.eventService.notifyResponseComplete();
          }, 2000);
        }
      });
  }
}
