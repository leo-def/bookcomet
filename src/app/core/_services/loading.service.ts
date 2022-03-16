import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _curentLoading: boolean = false;
  private _loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  public get currentLoading(): boolean {
    return this._curentLoading;
  }

  public get loading(): EventEmitter<boolean> {
    return this._loading;
  }

  constructor() { 
  }

  startLoading() {
    this._loading.next(true);
  }

  stopLoading() {
    this._loading.next(false);
  }
}
