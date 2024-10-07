import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/features/auth/services/TokenService/Token.service';

@Injectable({
  providedIn: 'root'
})
export class CreateuserService {
  private apiUrl = 'https://guiastur.test/guiastur/api/routes/Users';

  constructor(private http: HttpClient, private TokenService: TokenService) {}

  getRoles(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(`${this.apiUrl}/roles.php`, { headers, withCredentials: true });
  }

  createUser(user: any): Observable<any> {
    const token = this.TokenService.getCookie('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const userData = {
      action: 'create',
      ...user
    };

    return this.http.post(`${this.apiUrl}/createUsers.php`, userData, { headers, withCredentials: true });
  }
}
