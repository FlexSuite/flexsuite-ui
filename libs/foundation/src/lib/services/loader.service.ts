import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private _loading: BehaviorSubject<boolean>;
  private _loadingMessage: BehaviorSubject<string>;

  private _error: BehaviorSubject<boolean>;
  private _errorMessages: BehaviorSubject<string[]>;

  private _defaultMessage = 'Carregando informações...';

  constructor() {
    this._loading = new BehaviorSubject<boolean>(false);
    this._loadingMessage = new BehaviorSubject<string>(this._defaultMessage);
    this._error = new BehaviorSubject<boolean>(false);
    this._errorMessages = new BehaviorSubject<string[]>([]);

   }

  show(message: string = this._defaultMessage): void {
    this._loading.next(true);
    this._loadingMessage.next(message);
  }

  hide(): void {
    if(this._error.value) {
      throw new Error('Cannot hide loader when error is active');
    };

    this._loading.next(false);
  }

  info(message: string): void {
    this._loadingMessage.next(message);
  }

  error(messages: string[] | string, error?: Error): void {
    const tempMessages = Array.isArray(messages) ? messages : [messages];

    if(!this._loading.value)
      (this._loading as BehaviorSubject<boolean>).next(true);

    if(!error)
      error = new Error(tempMessages[0]);

    this._error.next(true);

    this._loadingMessage.next(tempMessages[0]);

    //Verifica se tem mais de uma mensagem e não adiciona a primeira
    if(tempMessages.length > 1){
      tempMessages.shift();
      this._errorMessages.next(tempMessages);
    }

    throw(error)
  }

  reset(): void {
    this._error.next(false);
    this._loading.next(false);
    this._errorMessages.next([]);
    this._loadingMessage.next(this._defaultMessage);
  }

  get isLoading(): Observable<boolean> {
    return this._loading.asObservable();
  }

  get message(): Observable<string> {
    return this._loadingMessage.asObservable();
  }

  get hasError(): Observable<boolean> {
    return this._error.asObservable();
  }

  get errorMessages(): Observable<string[]> {
    return this._errorMessages.asObservable();
  }
}
