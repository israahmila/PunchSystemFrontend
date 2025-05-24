// audit.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuditEntry } from './audit-entry.model';

@Injectable({
  providedIn: 'root'
})
export class AuditService {
  private baseUrl = 'https://localhost:7225/api/audit';

  constructor(private http: HttpClient) {}

  getAll(): Observable<AuditEntry[]> {
    return this.http.get<AuditEntry[]>(this.baseUrl);
  }

  getFiltered(filters: any): Observable<AuditEntry[]> {
    let params = new HttpParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        params = params.set(key, filters[key]);
      }
    });
    return this.http.get<AuditEntry[]>(`${this.baseUrl}/filter`, { params });
  }
}