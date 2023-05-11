import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'arqmedes-desafio-front-end';

  constructor(private _authGuard: AuthGuardService) {
  }
  
  ngOnInit(): void {
    this._authGuard.canActivate();
  }
}
