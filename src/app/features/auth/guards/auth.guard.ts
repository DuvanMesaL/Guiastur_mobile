import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TokenService } from '../services/TokenService/Token.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const authToken = this.tokenService.getCookie('auth_token');

    if (authToken) {
      return true;
    } else {
      return this.tokenService.refreshToken().pipe(
        map((response: any) => {
          if (response.token) {
            this.tokenService.setAuthToken(response.token);
            return true;
          } else {
            this.router.navigate(['/login']);
            return false;
          }
        }),
        catchError(() => {
          this.router.navigate(['/login']);
          return of(false);
        })
      );
    }
  }
}
