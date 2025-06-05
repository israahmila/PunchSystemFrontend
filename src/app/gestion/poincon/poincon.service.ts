import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PoinconService {
  private apiUrl = 'https://localhost:7225/api/Poincon';

  constructor(private http: HttpClient) {}

  // Used in Liste
  getAll(search = '', page = 1, pageSize = 10): Observable<any> {
    let params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);
    if (search) {
      params = params.set('search', search);
    }
    return this.http.get(`${this.apiUrl}`, { params });
  }

  // Used in Details and Modifier
  getById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Alias for getById (fix getOne() error)
  getOne(id: string): Observable<any> {
    return this.getById(id);
  }

  // Soft delete
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Modifier poinçon
  update(id: string, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }

  // Ajouter poinçon
  ajouterPoincon(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}`, formData);
  }

  // Autocomplete
  getSuggestions(field: string, q: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/suggestions`, {
      params: new HttpParams().set('field', field).set('q', q)
    });
  }
}

