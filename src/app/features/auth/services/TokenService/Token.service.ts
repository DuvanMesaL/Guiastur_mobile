import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private apiUrl = 'https://guiastur.test/guiastur/api/routes/Users';

  constructor(private http: HttpClient) {}

  refreshToken(): Observable<any> {
    const refreshToken = this.getCookie('refresh_token');
    if (!refreshToken) {
      console.error('No se encontró el refresh_token');
      return throwError('No refresh_token found');
    }

    return this.http.post(`${this.apiUrl}/refreshtoken.php`, { refresh_token: refreshToken }, { withCredentials: true })
      .pipe(
        tap((response: any) => {
          if (response && response.token) {
            this.setCookie('auth_token', response.token, 60);
          } else {
            console.error('No se encontró el token en la respuesta.');
          }
        }),
        catchError(error => {
          console.error('Error al intentar refrescar el token:', error);
          return throwError(error);
        })
      );
  }

  public setAuthToken(token: string): void {
    this.setCookie('auth_token', token, 1);
  }

  public setCookie(name: string, value: string, minutes: number) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (minutes * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=None;Secure`;
  }

  public getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

}
