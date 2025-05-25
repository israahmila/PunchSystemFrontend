import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { NgIf } from '@angular/common';
import { MatExpansionModule} from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/auth.service';
import { can } from '../../../core/utils/permission.utils';
import { PermissionService } from '../../../core/permission.service';
import { Permission } from '../../../gestion/utilisateurs/utilisateur.model';

@Component({
  standalone: true,
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatExpansionModule,
    RouterModule
  ]
})
export class ShellComponent {
  permissions: string[] = [];

constructor(
  private authService: AuthService,
  private permissionService: PermissionService
) {
  this.permissions = this.authService.getPermissions();
  this.permissionService.loadPermissions(this.permissions); // 🔁 direct
}

can(permission: string): boolean {
  return this.permissionService.has(permission); // ✅ simple & clair
}
}
