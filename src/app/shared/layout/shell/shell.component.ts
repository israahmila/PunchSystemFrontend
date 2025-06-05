import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { PermissionService } from '../../../core/permission.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class SidebarComponent implements OnInit {
  suiviOpen = false; // ✅ Variable de toggle du sous-menu

  constructor(public permissionService: PermissionService) {}


ngOnInit(): void {
  const storedPermissions = localStorage.getItem('user_permissions');
  if (storedPermissions) {
    const parsed = JSON.parse(storedPermissions);
    this.permissionService.loadPermissions(parsed);
  } else {
    console.warn('Aucune permission trouvée dans localStorage');
  }
}


  has(permission: string): boolean {
    return this.permissionService.has(permission);
  }

  toggleSuiviMenu(): void {
    this.suiviOpen = !this.suiviOpen;
  }
}

