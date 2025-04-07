import {CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SharedDataService} from "../shared/shared.data.service";
import {environment} from "../../environments/environment.development";


@Component({
    selector: 'app-edit-message-panel',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule,],
    templateUrl: './edit-message-panel.component.html',
    styleUrl: '../app.component.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class EditMessagePanelComponent {
    isButtonSavingInProcessing = false;
    buttonSavingText = 'Save Changes';
    buttonCopyFromText = 'Copy Response';
    isButtonCopyingInProcessing: boolean = false;
    backendUrl = "";
    path = '/lstn/message';

    editMessage: string = "";
    updatedMessage: any = "";

    @ViewChild('saveChangesButton') saveChangesButton!: ElementRef;
    @ViewChild('copyRequestButton') copyRequestButton!: ElementRef;

    constructor(private http: HttpClient,
                private sharedDataService: SharedDataService) {
                this.editMessage = '';
      this.backendUrl = environment.backendServiceUrl;
    }

    ngOnInit() {
        console.log(" ngOnInit");
        this.sharedDataService.message$.subscribe((data) => {
            console.log("Subscribe...............");
        });
    }

    // Save Changes button click
    updateRag() {
        this.saveChangesButton.nativeElement.className = 'disabled-button';
        this.isButtonSavingInProcessing = true;
        this.editMessage = this.sharedDataService.getReponse();
        this.buttonSavingText = 'Saving Changes..';
        console.log("Saving Changes.."); //
        const headers = new HttpHeaders({
            'Content-Type': 'text/plain'
        });
        this.http.post(this.backendUrl + this.path , this.editMessage)
            .subscribe({
                next: (res) => {
                    console.log('Response from server:', res); // Log success response
                    this.updatedMessage = res;
                    this.editMessage = "Saved successful";

                },
                error: (error) => {
                  this.isButtonSavingInProcessing = false; // Re-enable after processing
                  this.buttonSavingText = 'Save Changes';
                  this.saveChangesButton.nativeElement.className = 'enabled-button';
                   console.error('Error occurred:', error); // Log any errors
                },
                complete: () => {
                    console.log('Request completed'); // (Optional) Log when request completes
                    setTimeout(() => {
                        this.isButtonSavingInProcessing = false; // Re-enable after processing
                        this.buttonSavingText = 'Save Changes';
                        this.saveChangesButton.nativeElement.className = 'enabled-button';
                    }, 2000);
                }

            });

    }

    // Copy Request button click
    copyFromResponse() {
        this.editMessage = this.sharedDataService.getReponse();
    }

}
