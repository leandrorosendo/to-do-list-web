import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Lists } from '../models/lists';


@Injectable({
  providedIn: 'root'
})


export class TodolistService {

  private url = 'http://localhost:8000/api/listas'; // API


  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // get all list
  getLista(): Observable<Lists[]> {
    return this.httpClient.get<Lists[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }


  // get list by id
  getListaId(id: number): Observable<Lists> {
    return this.httpClient.get<Lists>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva list
  saveLista(list: Lists): Observable<Lists> {
    return this.httpClient.post<Lists>(this.url, JSON.stringify(list), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // update  list
  updateLista(list: Lists): Observable<Lists> {
    return this.httpClient.put<Lists>(this.url + '/' + list.id, JSON.stringify(list), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // delete list
  deleteLista(list: Lists) {
    return this.httpClient.delete<Lists>(this.url + '/' + list.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // done list
  doneLista(list: Lists): Observable<Lists> {
    return this.httpClient.put<Lists>(this.url + '/done/' + list.id, JSON.stringify(list), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }


  // erros
  handleError(error: HttpErrorResponse) {
    let errorMessage: any;
    if (error.error instanceof ErrorEvent) {
      // Error side client
      errorMessage = error.error.message;
    } else {
      // Erro side server
 
      if (error.status === 422) {
        let Keys = Object.keys(error.error.errors);
        let Mensagens: any = [];
        Keys.forEach((key) => Mensagens.push(error.error.errors[key][0]), this);
        errorMessage = { status: error.status, erro: error.error.message, mensagem: Mensagens };
      } else {
        errorMessage = { status: error.status, erro: error.error.message, mensagem: error.error.errors };
      }
    }

    return throwError(errorMessage);
  };



}
