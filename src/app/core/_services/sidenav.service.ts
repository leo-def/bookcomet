import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private _curentIsOpen: boolean = false;
  private _reason: EventEmitter<string> = new EventEmitter<string>();
  private _isOpen: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  public get currentIsOpen(): boolean {
    return this._curentIsOpen;
  }

  public get isOpen(): EventEmitter<boolean> {
    return this._isOpen;
  }

  public get reason(): EventEmitter<string> {
    return this._reason;
  }

  constructor() {
    this._isOpen.pipe(
      tap((value: boolean) => this._curentIsOpen = value)
    ).subscribe();
  }

  toggle() {
    this._isOpen.next(!this._curentIsOpen);
  }

  open() {
    this._isOpen.next(true);
  }

  close() {
    this._isOpen.next(false);
  }
}
