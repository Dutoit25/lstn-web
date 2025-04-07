import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseMessagePanelComponent } from './response-message-panel.component';

describe('MessagePanelComponent', () => {
  let component: ResponseMessagePanelComponent;
  let fixture: ComponentFixture<ResponseMessagePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponseMessagePanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResponseMessagePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
