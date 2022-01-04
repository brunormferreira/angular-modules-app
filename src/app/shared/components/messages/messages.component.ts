import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageService } from 'src/app/core/services/messages/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  messages$!: Observable<string[]>;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messages$ = this.messageService.getMessages();
  }

  onClearMessages(): void {
    this.messageService.clear();
  }
}
