// entretiens.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entretien  } from './entretien.model';
@Injectable({
  providedIn: 'root'
})
export class EntretiensService {
  private baseUrl = 'https://localhost:7225/api/entretiens';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Entretien[]> {
    return this.http.get<Entretien[]>(this.baseUrl);
  }

  getOne(id: string): Observable<Entretien> {
    return this.http.get<Entretien>(`${this.baseUrl}/${id}`);
  }

  create(entretien: Entretien): Observable<Entretien> {
    return this.http.post<Entretien>(this.baseUrl, entretien);
  }

  update(id: string, entretien: Entretien): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, entretien);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
