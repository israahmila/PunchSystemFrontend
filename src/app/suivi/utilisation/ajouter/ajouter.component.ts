// ajouter-utilisation.component.ts
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilisationService } from '../utilisation.service';
import { Utilisation } from '../utilisation.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-ajouter-utilisation',
  templateUrl: './ajouter.component.html',
  styleUrls: ['./ajouter.component.scss'],
  imports: [
  CommonModule,
  ReactiveFormsModule,
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule
]

})
export class AjouterUtilisationComponent implements OnInit {
  utilisationForm!: FormGroup;
  utilisateurs: string[] = [];
  comprimeuses: string[] = [];
  produits: string[] = [];
  emplacements: string[] = [];
  lots: string[] = [];

  constructor(
    private fb: FormBuilder,
    private utilisationService: UtilisationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.utilisationForm = this.fb.group({
      dateUtilisation: ['', Validators.required],
      dateRetour: ['', Validators.required],
      userIds: [[], Validators.required],
      compresseuse: ['', Validators.required],
      produit: ['', Validators.required],
      emplacementRetour: ['', Validators.required],
      lotNumbers: [[], Validators.required],
      commentaire: [''],
      poincons: this.fb.array([this.createPoinconGroup()])
    });

    // charger les valeurs simulées (à remplacer par des appels de service réels)
    this.utilisateurs = ['User 1', 'User 2'];
    this.comprimeuses = ['Machine A', 'Machine B'];
    this.produits = ['Produit A', 'Produit B'];
    this.emplacements = ['Zone A', 'Zone B'];
    this.lots = ['Lot1', 'Lot2'];
  }

  get poinconsArray(): FormArray {
    return this.utilisationForm.get('poincons') as FormArray;
  }

  createPoinconGroup(): FormGroup {
    return this.fb.group({
      numero: ['', Validators.required],
      etat: ['', Validators.required]
    });
  }

  addPoincon(): void {
    this.poinconsArray.push(this.createPoinconGroup());
  }

  removePoincon(index: number): void {
    this.poinconsArray.removeAt(index);
  }

  onSubmit(): void {
    if (this.utilisationForm.invalid) {
      return;
    }

    const formValue = this.utilisationForm.value;
    const utilisation: Partial<Utilisation> = {
      dateUtilisation: formValue.dateUtilisation,
      dateRetour: formValue.dateRetour,
      compresseuse: formValue.compresseuse,
      nombreComprimes: formValue.nombreComprimés || 0,
      emplacementRetour: formValue.emplacementRetour,
      commentaire: formValue.commentaire,
      lotNumbers: formValue.lotNumbers,
      poinconIds: formValue.poincons.map((p: any) => p.numero),
      etatPoincons: formValue.poincons.map((p:any) => p.etat),
      userIds: formValue.userIds,
      codeFormats: [] // à compléter selon logique de l'app
    };

    this.utilisationService.create(utilisation).subscribe({
      next: () => this.router.navigate(['/suivi/utilisation/liste']),
      error: err => console.error('Erreur lors de l\'enregistrement', err)
    });
  }

  cancel(): void {
    this.router.navigate(['/suivi/utilisation/liste']);
  }
}
