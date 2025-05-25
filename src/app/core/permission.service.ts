import { Injectable } from '@angular/core';


// permission.service.ts
@Injectable({ providedIn: 'root' })
export class PermissionService {
  private permissions: string[] = [];

  loadPermissions(perms: string[]) {
    this.permissions = perms;
  }

  has(permission: string): boolean {
    return this.permissions.includes(permission);
  }

  getAll(): string[] {
    return this.permissions;
  }
}
