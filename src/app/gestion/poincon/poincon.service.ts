import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Poincon } from './poincon.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PoinconService {
  private apiUrl = 'https://localhost:7225/api/poincons';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Poincon[]> {
    return this.http.get<Poincon[]>(this.apiUrl);
  }

  getOne(id: number): Observable<Poincon> {
    return this.http.get<Poincon>(`${this.apiUrl}/${id}`);
  }

  addMany(poincons: Poincon[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/batch`, poincons);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  getById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  uploadFiche(file: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
  
    return this.http.post<{ url: string }>(
      'https://localhost:7225/api/poincons/upload',
      formData
    );
  }
  
}
