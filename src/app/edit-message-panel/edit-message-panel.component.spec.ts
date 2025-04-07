import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMessagePanelComponent } from './edit-message-panel.component';

describe('MessagePanelComponent', () => {
  let component: EditMessagePanelComponent;
  let fixture: ComponentFixture<EditMessagePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMessagePanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditMessagePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
