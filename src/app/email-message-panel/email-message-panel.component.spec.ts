import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailMessagePanelComponent } from './email-message-panel.component';

describe('MessagePanelComponent', () => {
  let component: EmailMessagePanelComponent;
  let fixture: ComponentFixture<EmailMessagePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailMessagePanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmailMessagePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
