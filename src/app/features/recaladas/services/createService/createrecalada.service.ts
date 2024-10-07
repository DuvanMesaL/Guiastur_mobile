import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenService } from 'src/app/features/auth/services/TokenService/Token.service';
@Injectable({
  providedIn: 'root'
})
export class CreaterecaladaService {
  private apiUrl = 'https://guiastur.test/guiastur/api/routes/Recaladas';

  constructor(private http: HttpClient, private TokenService: TokenService) {}

  createRecalada(recalada: any): Observable<any> {
    const token = this.TokenService.getCookie('auth_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const recalData = {
      action: 'create',
      ...recalada
    };

    return this.http.post(`${this.apiUrl}/CreateRecalada.php`, recalData, { headers, withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('Ocurrió un error:', error);
    return throwError('Algo salió mal; intenta de nuevo más tarde.');
  }
}