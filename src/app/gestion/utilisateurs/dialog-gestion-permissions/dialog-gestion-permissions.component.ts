import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PermissionService } from '../../../core/permission.service';
import { Permission } from '../utilisateur.model';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-dialog-gestion-permissions',
  templateUrl: './dialog-gestion-permissions.component.html',
  styleUrls: ['./dialog-gestion-permissions.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatDialogActions
  ]
})
export class DialogGestionPermissionsComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogGestionPermissionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: string; permissions: Permission[] },
    private permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    const groupedPermissions: { [key: string]: Permission[] } = {};
    this.data.permissions.forEach((perm) => {
      if (!groupedPermissions[perm.module]) {
        groupedPermissions[perm.module] = [];
      }
      groupedPermissions[perm.module].push(perm);
    });

    const permissionFormGroups = Object.entries(groupedPermissions).map(([module, perms]) => {
      const group: any = {
        module
      };
      perms.forEach((perm) => {
        group[perm.action!.toLowerCase()] = true;
      });
      return this.fb.group(group);
    });

    this.form = this.fb.group({
      permissions: this.fb.array(permissionFormGroups)
    });
  }

  get permissionsArray(): FormArray {
    return this.form.get('permissions') as FormArray;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    const formValue = this.form.value.permissions;
    const permissions: string[] = [];

    formValue.forEach((group: any) => {
      Object.keys(group).forEach((key) => {
        if (key !== 'module' && group[key]) {
          permissions.push(`${group.module}.${key.charAt(0).toUpperCase() + key.slice(1)}`);
        }
      });
    });

    this.permissionService.updateUserPermissions(this.data.userId, permissions).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}
