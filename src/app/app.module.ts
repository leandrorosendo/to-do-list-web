import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodolistComponent } from './todolist/todolist.component';
import { FormsModule } from '@angular/forms'
import { TodolistService } from './services/todolist.service';
import { HttpClientModule } from "@angular/common/http";
import { MessagingComponent } from './messaging/messaging.component';


@NgModule({
  declarations: [
    AppComponent,
    TodolistComponent,
    MessagingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [TodolistService],
  bootstrap: [AppComponent]
})
export class AppModule { }
