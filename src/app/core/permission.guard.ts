// permission.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PermissionService } from './permission.service';

export function permissionGuard(permission: string): CanActivateFn {
  return () => {
    const permissionService = inject(PermissionService);
    const router = inject(Router);
    const [module, action] = permission.split('.');
    const hasPermission = permissionService.can(module, action as 'consulter' | 'ajouter' | 'modifier' | 'supprimer');

    if (!hasPermission) {
      router.navigate(['/dashboard']);
      return false;
    }
    return true;
  };
}
