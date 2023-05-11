import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  auth: boolean = false;

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  canActivate(): boolean {

    this._authService.isAuthenticated$.subscribe({
      next: (resp: any) => {
        if (resp) {
          this.auth = resp;
        } else {
          this._router.navigate(['login']);
          return resp;
        }
      }
    });

    return this.auth;

  }

}
