import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { catchError, filter, finalize, Observable, tap } from 'rxjs';
import { MessageTypeEnum } from 'src/app/core/_enums/message-type.enum';
import { AuthService } from 'src/app/core/_services/auth.service';
import { LoadingService } from 'src/app/core/_services/loading.service';
import { Login } from 'src/app/core/_types/auth/login';
import { User } from 'src/app/core/_types/auth/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  public error: any;
  private returnUrl?: any;

  constructor(
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private loadingService: LoadingService) {
    }

  public ngOnInit(): void {
    this.route.queryParams.pipe(
      tap((params: Params) => this.returnUrl = params['returnUrl']),
    ).subscribe();
  }

  public onSubmit() {
    const login = this.form.getRawValue() as Login;
    this.login(login);
  }

  public login(login: Login) {
    this.startLoading()
    this.authService.login(login).pipe(
      tap(() => this.showSuccess()),
      tap(() => this.redirectLoginSuccess()),
      catchError((err: any, caught: Observable<User>) => {
        this.handleError(err);
        return caught;
      }),
      finalize(() => this.stopLoading())
    ).subscribe();
  }

  protected redirectLoginSuccess() {
    this.router.navigate([ this.returnUrl || 'admin']); // ,{ relativeTo: this.route }
  }

  protected startLoading() {
    this.loadingService.startLoading();
  }

  protected stopLoading() {
    this.loadingService.stopLoading();
  }

  protected showSuccess() {
    this.showMessage('Login success', MessageTypeEnum.success);
  }

  protected handleError(err: any) {
    this.showMessage('error', MessageTypeEnum.error);
    this.error = err;
  }

  protected showMessage (msg: string, type?: MessageTypeEnum){
    this._snackBar.open(`${type} - ${msg}`, 'OK', { duration: 2000 });
  }
}
