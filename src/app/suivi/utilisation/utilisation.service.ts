// utilisation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Utilisation } from './utilisation.model';

@Injectable({ providedIn: 'root' })
export class UtilisationService {
  private apiUrl = 'https://localhost:7225/api/utilisations';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Utilisation[]> {
    return this.http.get<Utilisation[]>(this.apiUrl);
  }

  getById(id: string): Observable<Utilisation> {
    return this.http.get<Utilisation>(`${this.apiUrl}/${id}`);
  }

  create(utilisation: Omit<Utilisation, 'id' | 'dateUtilisation' | 'codeFormats' | 'etatPoincons'>): Observable<Utilisation> {
    return this.http.post<Utilisation>(this.apiUrl, utilisation);
  }

  update(id: string, utilisation: Partial<Utilisation>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, utilisation);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
