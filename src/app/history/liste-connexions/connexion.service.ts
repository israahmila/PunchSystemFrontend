// connexion.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConnexionLog } from './connexion-log.model';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {
  private baseUrl = 'https://localhost:7225/api/connexions';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ConnexionLog[]> {
    return this.http.get<ConnexionLog[]>(this.baseUrl);
  }

  getFiltered(filters: any): Observable<ConnexionLog[]> {
    let params = new HttpParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        params = params.set(key, filters[key]);
      }
    });
    return this.http.get<ConnexionLog[]>(`${this.baseUrl}/filter`, { params });
  }
}