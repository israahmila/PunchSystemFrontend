import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter-utilisation',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCardModule,ReactiveFormsModule],
  templateUrl: './ajouter.component.html',
  styleUrls: ['./ajouter.component.scss']
})
export class AjouterUtilisationComponent implements OnInit {
  utilisationForm!: FormGroup;
  utilisateurs: string[] = ['Alice', 'Bob', 'Charlie'];
  comprimeuses: string[] = ['Comprimeuse A', 'Comprimeuse B', 'Comprimeuse C'];
  produits: string[] = ['Produit 1', 'Produit 2', 'Produit 3'];
  emplacements: string[] = ['Emplacement A', 'Emplacement B', 'Emplacement C'];
  lots: string[] = ['Lot 1', 'Lot 2', 'Lot 3'];

  constructor(private fb: FormBuilder,public router: Router) {}

  ngOnInit(): void {
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

    // Initialize with 30 empty poinçons
    this.initPoincons(30);
  }

  get poinconsArray(): FormArray {
    return this.utilisationForm.get('poincons') as FormArray;
  }

  initPoincons(count: number): void {
    for (let i = 0; i < count; i++) {
      this.poinconsArray.push(this.fb.group({
        numero: [''],
        etat: ['']
      }));
    }
  }

  onSubmit(): void {
    this.router.navigate(['/suivi/utilisation/liste']);
    console.log(this.utilisationForm.value);
  }

  cancel(): void {
    this.utilisationForm.reset();
  }
}
