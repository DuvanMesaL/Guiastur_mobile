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
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401 && !req.url.includes('refreshtoken.php')) {
                    return this.TokenService.refreshToken().pipe(
                        switchMap((response: any) => {
                            this.TokenService.setAuthToken(response.token);
                            const clonedRequest = req.clone({
                                setHeaders: { Authorization: `Bearer ${response.token}` }
                            });
                            return next.handle(clonedRequest);
                        }),
                        catchError((refreshError) => {
                            this.router.navigate(['/login']);
                            return throwError(refreshError);
                        })
                    );
                } else {
                    return throwError(error);
                }
            })
        );
    }
}