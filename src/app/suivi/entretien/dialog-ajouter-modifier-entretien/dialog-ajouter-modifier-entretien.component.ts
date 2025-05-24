// dialog-ajouter-modifier-entretien.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Entretien } from '../entretien.model';

@Component({
  selector: 'app-dialog-ajouter-modifier-entretien',
  standalone: true,
  templateUrl: './dialog-ajouter-modifier-entretien.component.html',
  styleUrls: ['./dialog-ajouter-modifier-entretien.component.scss'],
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
export class DialogAjouterModifierEntretienComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  utilisateurs: string[] = ['Alice', 'Bob'];
  poincons: string[] = ['P1', 'P2'];
  types: string[] = ['Nettoyage', 'Lubrification'];
  produits: string[] = ['Produit A', 'Produit B'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogAjouterModifierEntretienComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Entretien | null
  ) {}

  ngOnInit(): void {
    this.isEditMode = !!this.data;

    this.form = this.fb.group({
      reference: [this.data?.id || '', Validators.required],
      utilisateurId: [this.data?.utilisateurId || '', Validators.required],
      referencePoincon: [this.data?.referenceUtilisation || '', Validators.required],
      type: [this.data?.operations?.[0]?.type || '', Validators.required],
      date: [this.data?.date || '', Validators.required],
      produit: [this.data?.operations?.[0]?.produit || '', Validators.required],
      commentaire: [this.data?.operations?.[0]?.commentaire || '']
    });
  }

  submit(): void {
    if (this.form.valid) {
      const result: Entretien = {
        id: this.form.value.reference,
        utilisateurId: this.form.value.utilisateurId,
        referenceUtilisation: this.form.value.referencePoincon,
        date: this.form.value.date,
        operations: [
          {
            type: this.form.value.type,
            produit: this.form.value.produit,
            commentaire: this.form.value.commentaire
          }
        ]
      };
      this.dialogRef.close(result);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
