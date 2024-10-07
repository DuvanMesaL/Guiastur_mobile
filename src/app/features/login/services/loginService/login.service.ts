import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { TokenService } from 'src/app/features/auth/services/TokenService/Token.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://guiastur.test/guiastur/api/routes/Users/login.php';

  constructor(private http: HttpClient, private TokenService:TokenService) {}

  login(email: string, password: string): Observable<any> {
    const loginData = { email, password, action: 'login' };

    return this.http.post(`${this.apiUrl}`, loginData, { withCredentials: true }).pipe(
      tap((response: any) => {
        console.log('Login exitoso:', response);
        if (response && response.token) {
          this.TokenService.setAuthToken(response.token);
          this.TokenService.setCookie('refresh_token', response.refresh_token, 60 * 24 * 7);
        } else {
          console.error('Token no encontrado en la respuesta');
        }
      }),
      catchError(error => {
        console.error('Error en el login:', error);
        throw error;
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout.php`, { action: 'logout' }, { withCredentials: true });
  }
}