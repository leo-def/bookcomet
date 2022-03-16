import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Login } from '../_types/auth/login';
import { User } from '../_types/auth/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static AUTH_STORAGE_KEY = 'inf'
  private _currentUser?: User;
  private _user: EventEmitter<User | undefined> = new EventEmitter<User | undefined>();

  public get user(): EventEmitter<User | undefined> {
    return this._user;
  }
  
  public get currentUser(): User | undefined {
    return this._currentUser;
  }
  
  constructor() {
    this._user.pipe(
      tap( (user?: User) => this._currentUser = user),
      tap( (user?: User) => this.setStoreUser(user))
    ).subscribe();
   }

  login(login: Login): Observable<User> {
    return of(this.loadMockUser(login)).pipe(
      tap(usr => this.setUser(usr))
    )
  }

  logout() {
    this.setUser();
  }

  loadMockUser(login: Login) {
    const username = login ? login.username : 'username';
    const email = `${username}@email.com`;
    const id = new Date().getTime();
    const role = 'admin';
    return ({
      id,
      username,
      email,
      role
    })
  }

  loadStoreUser() {
    const user = this.getStoreUser();
    this.setUser(user);
  }

  private setUser(user?: User) {
    this._user.next(user);
  }

  private getStoreUser(): User | undefined {
    const data = localStorage.getItem(AuthService.AUTH_STORAGE_KEY);
    return data != null ? JSON.parse(data) as User : undefined;
  }

  private setStoreUser(user?: User): User | undefined {
    if(!user) {
      this.removeStoreUser();
      return user;
    }
    localStorage.setItem(
      AuthService.AUTH_STORAGE_KEY,
      JSON.stringify(user)
    );
    return user;
  }
  
  private removeStoreUser() {
    return localStorage.removeItem( AuthService.AUTH_STORAGE_KEY);
  }
}
