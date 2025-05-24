import { Injectable } from '@angular/core';
import { UserPermission } from '../gestion/utilisateurs/utilisateur.model';

@Injectable({ providedIn: 'root' })
export class PermissionService {
  private permissions: UserPermission[] = [];

  loadPermissions(perms: UserPermission[]) {
    this.permissions = perms;
  }

  can(module: string, action: 'consulter' | 'ajouter' | 'modifier' | 'supprimer'): boolean {
    const found = this.permissions.find(p => p.module === module);
    return !!found && !!found[action];
  }
}
