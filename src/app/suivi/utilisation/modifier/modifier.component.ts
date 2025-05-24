// modifier-utilisation.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UtilisationService } from '../utilisation.service';

@Component({
  selector: 'app-modifier-utilisation',
  standalone: true,
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class ModifierUtilisationComponent implements OnInit {
  utilisationForm!: FormGroup;
  utilisateurs: string[] = ['Alice', 'Bob', 'Charlie'];
  comprimeuses: string[] = ['Comprimeuse A', 'Comprimeuse B', 'Comprimeuse C'];
  produits: string[] = ['Produit 1', 'Produit 2', 'Produit 3'];
  emplacements: string[] = ['Emplacement A', 'Emplacement B', 'Emplacement C'];
  lots: string[] = ['Lot 1', 'Lot 2', 'Lot 3'];

  id!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private utilisationService: UtilisationService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.utilisationForm = this.fb.group({
      numero: ['', Validators.required],
      dateUtilisation: ['', Validators.required],
      dateRetour: ['', Validators.required],
      utilisateurs: [[], Validators.required],
      comprimeuses: [[], Validators.required],
      produit: ['', Validators.required],
      emplacementRetour: ['', Validators.required],
      lots: [[], Validators.required],
      comment: [''],
      poincons: this.fb.array([])
    });

    this.fetchUtilisation();
  } 

  get poinconsArray(): FormArray {
    return this.utilisationForm.get('poincons') as FormArray;
  }

  fetchUtilisation() {
    this.utilisationService.getOne(this.id).subscribe({
      next: (data) => {
        this.utilisationForm.patchValue({
          numero: data.id,
          dateUtilisation: data.dateUtilisation,
          dateRetour: data.dateRetour,
          utilisateurs: data.userIds,
          comprimeuses: [data.compresseuse],
          produit: data.codeFormats?.[0] ?? '',
          emplacementRetour: data.emplacementRetour,
          lots: data.lotNumbers,
          comment: data.commentaire
        });

        const poincons = data.poinconIds.map((id: string, idx: number) => ({
          numero: id,
          etat: data.etatPoincons?.[idx] ?? ''
        }));

        this.poinconsArray.clear();
        for (let i = 0; i < 30; i++) {
          this.poinconsArray.push(this.fb.group(poincons[i] || { numero: '', etat: '' }));
        }
      },
      error: (err) => {
        console.error('❌ Failed to load utilisation:', err);
        this.router.navigate(['/suivi/utilisation/liste']);
      }
    });
  }

  onSubmit(): void {
    const payload = {
      ...this.utilisationForm.value,
      userIds: this.utilisationForm.value.utilisateurs,
      lotNumbers: this.utilisationForm.value.lots,
      poinconIds: this.utilisationForm.value.poincons.map((p: any) => String(p.numero)),
      etatPoincons: this.utilisationForm.value.poincons.map((p: any) => p.etat),
      codeFormats: [this.utilisationForm.value.produit],
      compresseuse: this.utilisationForm.value.comprimeuses?.[0] ?? ''
    };

    this.utilisationService.update(this.id, payload).subscribe({
      next: () => this.router.navigate(['/suivi/utilisation/liste']),
      error: (err) => console.error('❌ Update failed', err)
    });
  }

  cancel(): void {
    this.router.navigate(['/suivi/utilisation/liste']);
  }
}