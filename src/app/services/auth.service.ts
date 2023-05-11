import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Users } from '../models/users.model';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authSub$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  key = 'isAuthenticated';
  
  constructor(
    private _router: Router,
    private _http: HttpClient,
    private _usersService: UsersService
    ) {
    const now = new Date().getTime();
    const value = localStorage.getItem(this.key);
    const storedItem = (value) ? JSON.parse(value) : null;
    if (storedItem && storedItem.expiration > now) {
      this.authSub$.next(true);
    } else {
      this.authSub$.next(false);
    }    
  }

  public get isAuthenticated$(): Observable<boolean> {
    return this.authSub$.asObservable();
  }

  public setAuthenticated(value: boolean): void {
    this.authSub$.next(value);
  }

  public login(): Observable<Users[]> {
    return this._usersService.getUsers();
  }

  public logout(redirect: string): void {
    localStorage.removeItem(this.key);
    this.authSub$.next(false);
    this._router.navigate([redirect]);
  }

  public ngOnDestroy(): void {
    this.authSub$.next(false);
    this.authSub$.complete();
  }

}