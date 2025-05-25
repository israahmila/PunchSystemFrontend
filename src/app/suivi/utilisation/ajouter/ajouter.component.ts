// ajouter-utilisation.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UtilisationService } from '../utilisation.service';
import { PoinconService } from '../../../gestion/poincon/poincon.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UtilisateurService } from '../../../gestion/utilisateurs/utilisateur.service';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips'


@Component({
  selector: 'app-ajouter-utilisation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
   MatIconModule,
   MatChipsModule
  ],
  templateUrl: './ajouter.component.html',
  styleUrls: ['./ajouter.component.scss']
})
export class AjouterUtilisationComponent implements OnInit {
  form: FormGroup;
  users: any[] = [];
  poincons: any[] = [];
  lotInput = new FormControl('');

  constructor(
    private fb: FormBuilder,
    private service: UtilisationService,
    private userService: UtilisateurService,
    private poinconService: PoinconService,
    private router: Router
  ) {
    this.form = this.fb.group({
      compresseuse: ['', Validators.required],
      nombreComprimes: [0, [Validators.required, Validators.min(1)]],
      emplacementRetour: ['', Validators.required],
      commentaire: [''],
      lotNumbers: this.fb.array([], Validators.required),
      poinconIds: [[], Validators.required],
      userIds: [[], Validators.required]
    });
  }

  ngOnInit(): void {
    this.userService.getAll().subscribe({
      next: data => this.users = data,
      error: err => console.error('Erreur chargement utilisateurs', err)
    });

    this.poinconService.getAll().subscribe({
      next: data => this.poincons = data,
      error: err => console.error('Erreur chargement poinçons', err)
    });
  }

  get lotNumbers(): FormArray {
    return this.form.get('lotNumbers') as FormArray;
  }

  addLot(): void {
    const lot = this.lotInput.value?.trim();
    if (lot) {
      this.lotNumbers.push(new FormControl(lot));
      this.lotInput.reset();
    }
  }

  removeLot(index: number): void {
    this.lotNumbers.removeAt(index);
  }

  onSubmit() {
    if (this.form.valid) {
      this.service.create(this.form.value).subscribe({
        next: () => this.router.navigate(['/suivi/utilisation/liste']),
        error: (err) => console.error('Erreur lors de la création', err)
      });
    }
  }
}
