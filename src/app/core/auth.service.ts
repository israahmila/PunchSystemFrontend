import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://localhost:7225/api/Auth'; // ✅ Base URL
  private tokenKey = 'auth_token';
  private permissionsKey = 'user_permissions';
  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap(response => {
          localStorage.setItem(this.tokenKey, response.token);
          localStorage.setItem(this.permissionsKey, JSON.stringify(response.permissions));
        })
      );
  }
  
  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
  getPermissions(): string[] {
  const token = localStorage.getItem('auth_token');
  if (!token) return [];
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload?.permissions || [];
  } catch {
    return [];
  }
}



  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.permissionsKey);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
