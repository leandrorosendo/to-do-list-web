import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Message } from '../models/message';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  
  public messages = {} as Message;
  
  @Input() message:  HttpErrorResponse | any;

  constructor() {
   
  }

  ngOnInit(): void {
  
  }

  ngOnChanges(changes: SimpleChanges) {

    // Ok
    if (this.message?.status == 200) {
      this.messages.erratrib = false;
      this.messages.class = 'success';
      this.messages.text = this.message?.mensagem
    }

    // Unprocessable Entity
    if (this.message?.status == 422) {
      this.messages.erratrib = true;
      this.messages.class = 'warning';
      this.messages.text = this.message.error.message;
      let Keys = Object.keys(this.message.error.errors);
      let Mensagens: any = [];
      Keys.forEach((key) => Mensagens.push(this.message.error.errors[key][0]), this);
      this.messages.erros = Mensagens;
    }

    // Forbidden
    if (this.message?.status == 403) {
      this.messages.erratrib = false;
      this.messages.class = 'danger';
      this.messages.text = this.message.error.message;
    }
    
    // Serve off
    if (this.message?.status == 0) {
      this.messages.erratrib = false;
      this.messages.class = 'danger';
      this.messages.text = this.message.message;
    }
  }

}
