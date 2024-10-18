import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/features/auth/services/TokenService/Token.service';

@Injectable({
  providedIn: 'root'
})
export class CreateAtencionService {

  private apiUrl = 'https://guiastur.test/guiastur/api/routes/Atenciones'; // Ajusta el URL a la ruta de tu API

  constructor(private http: HttpClient, private TokenService: TokenService) {}

  getAtenciones(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.get(`${this.apiUrl}/listAtenciones.php`, { headers, withCredentials: true });
  }

  createAtencion(atencionData: any): Observable<any> {
    const token = this.TokenService.getCookie('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const atencionPayload = {
      action: 'create',
      ...atencionData
    };

    return this.http.post(`${this.apiUrl}/createAtencion.php`, atencionPayload, { headers, withCredentials: true });
  }
}