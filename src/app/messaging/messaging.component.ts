import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css']
})
export class MessagingComponent implements OnInit {
  @Input()  message : any;
  constructor() { }

  ngOnInit(): void {
  }

}
