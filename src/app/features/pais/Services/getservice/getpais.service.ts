import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetpaisService {
  private apiUrl = 'https://guiastur.test/guiastur/api/routes/Recaladas/Getpaises.php';

  constructor(private http: HttpClient) {}

  getPaises(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}