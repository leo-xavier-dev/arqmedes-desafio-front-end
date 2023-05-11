import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, filter, take, takeUntil } from 'rxjs';
import { Users } from 'src/app/models/users.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginValid = true;
  public username = '';
  public password = '';
  form: FormGroup;

  private _destroySub$ = new Subject<void>();
  private readonly returnUrl: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _authService: AuthService,
    public _fb: FormBuilder
  ) {
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/dashboard';

    this.form = this._fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  public ngOnInit(): void {
    this._authService.isAuthenticated$.pipe(
      filter((isAuthenticated: boolean) => isAuthenticated),
      takeUntil(this._destroySub$)
    ).subscribe((resp: any) => this._router.navigateByUrl(this.returnUrl));
  }

  public ngOnDestroy(): void {
    this._destroySub$.next();
  }

  public onSubmit(): void {
    const form = this.form.controls;
    this.loginValid = true;

    this._authService.login().pipe(take(1)).subscribe({
      next: (resp: Users[]) => {
        console.log('Retorno: ', resp);
        if (resp.some(user => user.usuario === form['username'].value && user.senha === form['password'].value)) {

          const value = 'true';
          const expirationTime = 4;
          const now = new Date().getTime();
          const expiration = now + expirationTime * 60 * 1000;
          const item = { value: value, expiration: expiration };
          localStorage.setItem('isAuthenticated', JSON.stringify(item));

          this._authService.setAuthenticated(true);
          this.loginValid = true;
          this._router.navigateByUrl('/dashboard');
        } else {
          Swal.fire('Informação', 'Usuário ou senha inválidos', 'info');
        }
      },
      error: (error: Error) => this.loginValid = false
    });
  }

}
