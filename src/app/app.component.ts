import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { EmailMessagePanelComponent } from './email-message-panel/email-message-panel.component';
import { UserInputComponent } from './user-input/user-input.component';
import { Message, MESSAGE_TYPE, OpenAIResponse } from './model/variables';
import { v4 as uuidv4 } from 'uuid';
import { OpenAIService } from './openai.service';
import { HttpClientModule } from '@angular/common/http';
import {ResponseMessagePanelComponent} from "./response-message-panel/response-message-panel.component";
import {EditMessagePanelComponent} from "./edit-message-panel/edit-message-panel.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    EmailMessagePanelComponent,
    UserInputComponent,
    HttpClientModule,
    HeaderComponent,
    UserInputComponent,
    EmailMessagePanelComponent,
    ResponseMessagePanelComponent,
    EditMessagePanelComponent
  ],
  providers: [OpenAIService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent  {
  title = 'lstn_web';
  data: Message[] = [];





}
