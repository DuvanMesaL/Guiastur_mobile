import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenService } from 'src/app/features/auth/services/TokenService/Token.service';
@Injectable({
  providedIn: 'root'
})
export class GetbuqueService {
  private apiUrl = 'https://guiastur.test/guiastur/api/routes/Buques';

  constructor(private http: HttpClient, private TokenService: TokenService) {}

  getBuques(): Observable<any> {
    const token = this.TokenService.getCookie('auth_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const requestData = {
      action: 'listall'
    };

    return this.http.post(`${this.apiUrl}/GetBuques.php`, requestData, { headers, withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('Ocurrió un error:', error);
    return throwError('Algo salió mal; intenta de nuevo más tarde.');
  }
}
