import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PermissionService {
  private apiUrl = 'https://localhost:7225/api/users';
  
  private userPermissions: string[] = [];

  constructor(private http: HttpClient) {}

  loadPermissions(permissions: string[]) {
    this.userPermissions = permissions;
  }

  has(permission: string): boolean {
    return this.userPermissions.includes(permission);
  }
  can(permission: string): boolean {
  return this.userPermissions.includes(permission);
}



  // ✅ Nouvelle méthode
  updateUserPermissions(userId: string, permissions: string[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${userId}/permissions`, permissions);
  }
}
