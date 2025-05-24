// dialog-ajouter-modifier-utilisateur.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../utilisateur.model';

@Component({
  selector: 'app-dialog-ajouter-modifier-utilisateur',
  standalone: true,
  templateUrl: './dialog-ajouter-modifier-utilisateur.component.html',
  styleUrls: ['./dialog-ajouter-modifier-utilisateur.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogActions
  ]
})
export class DialogAjouterModifierUtilisateurComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  roles = ['Administrateur', 'Superviseur', 'Agent'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogAjouterModifierUtilisateurComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User | null
  ) {}

  ngOnInit(): void {
    this.isEditMode = !!this.data;
    this.form = this.fb.group({
      nom: [this.data?.nom || '', Validators.required],
      prenom: [this.data?.prenom || '', Validators.required],
      email: [this.data?.email || '', [Validators.required, Validators.email]],
      login: [this.data?.login || '', Validators.required],
      password: ['', this.isEditMode ? [] : [Validators.required]],
      role: [this.data?.role || '', Validators.required],
      statut: [this.data?.statut || 'actif', Validators.required]
    });
  }

  submit(): void {
    if (this.form.valid) {
      const result = { ...this.form.value };
      this.dialogRef.close(result);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
