import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Utilisation {
  id: number;
  dateUtilisation: string;
  dateRetour: string;
  compresseuse: string;
  nombreComprimés: number;
  emplacementRetour: string;
  commentaire: string;
  lotNumbers: string[];
  poinconIds: number[];
  userIds: number[];
  codeFormats: string[];
  etatPoincons: string[];
}

@Injectable({
  providedIn: 'root'
})
export class UtilisationService {
  private baseUrl = 'https://localhost:7225/api/utilisations';

  constructor(private http: HttpClient) {}

  // GET all utilisations
  getAll(): Observable<Utilisation[]> {
    return this.http.get<Utilisation[]>(`${this.baseUrl}`);
  }

  // GET a single utilisation by ID
  getOne(id: number): Observable<Utilisation> {
    return this.http.get<Utilisation>(`${this.baseUrl}/${id}`);
  }

  // POST a new utilisation
  create(utilisation: Partial<Utilisation>): Observable<Utilisation> {
    return this.http.post<Utilisation>(`${this.baseUrl}`, utilisation);
  }

  // PUT (update) an existing utilisation
  update(id: number, utilisation: Partial<Utilisation>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, utilisation);
  }

  // DELETE an existing utilisation
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}


