import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './messages.component';

@NgModule({
  declarations: [MessagesComponent],
  exports: [MessagesComponent],
  imports: [CommonModule],
})
export class MessagesModule {}
