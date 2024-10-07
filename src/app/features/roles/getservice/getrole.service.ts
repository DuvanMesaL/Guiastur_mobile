import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetroleService {
  private apiUrl = 'https://192.168.101.91/guiastur/api/routes/Users/roles.php';

  constructor(private http: HttpClient) {}

  getRoles(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(`${this.apiUrl}`, { headers, withCredentials: true });
  }

}
