import { Component, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Lists } from '../models/lists';
import { TodolistService } from '../services/todolist.service';


@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

  public list = {} as Lists;
  public lists: Lists[];
  public message: any;
 

  constructor(private __todolistService: TodolistService) {
    this.lists = [];
    this.list.fl_realizado = false;
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.__todolistService.getLista().subscribe((list: Lists[]) => {
      this.lists = list;
    }, (error) => {                              //Error callback
      this.message = error;
    })
  };

  // delete list
  deleteLista(list: Lists) {
    this.__todolistService.deleteLista(list).subscribe(() => {
      this.getList();
      this.message = this.getSucessMessage();
    }, (error) => {
      this.message = error;
    });
  }

  // done a list item
  doneLista(list: Lists) {
    this.__todolistService.doneLista(list).subscribe(() => {
      this.getList();
      this.message = this.getSucessMessage();
    }, (error) => {
      this.message = error;
    });
  }

  // define whether a list will be created or updated
  saveLista(form: NgForm) {

    if (this.list.id !== undefined) {
      this.__todolistService.updateLista(this.list).subscribe(() => {
        this.cleanForm(form);
        this.message = this.getSucessMessage();
      }, (error) => {
        this.message = error;
      });
    } else {
      let teste = this.__todolistService.saveLista(this.list).subscribe(() => {
        this.cleanForm(form);
        this.message = this.getSucessMessage();
      }, (error) => {
        this.message = error;
      }); 
    }
  }

  // copies the list to be edited
  editLista(list: Lists) {
    this.list = { ...list };
  }

  // clean form
  cleanForm(form: NgForm) {
    this.getList();
    form.resetForm();
    this.list = {} as Lists;
    this.list.fl_realizado = false;
  }

  getSucessMessage() {
    return { status: 200, mensagem: "This action was successfully completed" };
  }

}
