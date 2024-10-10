import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { TokenService } from '../services/TokenService/Token.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private TokenService: TokenService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      console.log('Intercepting request:', req.url);

      return next.handle(req).pipe(
          catchError((error: HttpErrorResponse) => {
              console.log('Error occurred:', error.status);

              if (error.status === 401 && !req.url.includes('refreshtoken.php')) {
                  console.log('Token expired, trying to refresh token...');

                  return this.TokenService.refreshToken().pipe(
                      switchMap((response: any) => {
                          console.log('Token refreshed successfully:', response.token);

                          this.TokenService.setAuthToken(response.token);
                          const clonedRequest = req.clone({
                              setHeaders: { Authorization: `Bearer ${response.token}` }
                          });

                          console.log('Resending request with new token...');
                          return next.handle(clonedRequest);
                      }),
                      catchError((refreshError) => {
                          console.error('Failed to refresh token, redirecting to login...');
                          this.router.navigate(['/login']);
                          return throwError(refreshError);
                      })
                  );
              } else {
                  console.error('Other error:', error.message);
                  return throwError(error);
              }
          })
      );
  }

}
