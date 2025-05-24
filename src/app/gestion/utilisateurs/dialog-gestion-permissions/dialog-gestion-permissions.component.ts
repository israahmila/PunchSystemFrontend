// dialog-gestion-permissions.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { User , UserPermission } from '../utilisateur.model';

@Component({
  selector: 'app-dialog-gestion-permissions',
  standalone: true,
  templateUrl: './dialog-gestion-permissions.component.html',
  styleUrls: ['./dialog-gestion-permissions.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule,
    MatDialogActions
  ]
})
export class DialogGestionPermissionsComponent implements OnInit {
  form!: FormGroup;
  modules: string[] = ['Utilisateurs', 'Poinçons', 'Produits', 'Fournisseurs', 'Marques', 'Utilisations', 'Entretiens', 'Audit'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogGestionPermissionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      permissions: this.fb.array([])
    });

    const permissionsArray = this.form.get('permissions') as FormArray;

    this.modules.forEach(module => {
      const existing = this.data.permissions?.find(p => p.module === module);
      permissionsArray.push(
        this.fb.group({
          module: [module],
          consulter: [existing?.consulter || false],
          ajouter: [existing?.ajouter || false],
          modifier: [existing?.modifier || false],
          supprimer: [existing?.supprimer || false]
        })
      );
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value.permissions);
    }
  }

  cancel(): void {
    this
    .dialogRef.close();
  }
  get permissionsArray(): FormArray {
  return this.form.get('permissions') as FormArray;
}

}