// modifier-utilisation.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UtilisationService } from '../utilisation.service';
import { UtilisateurService } from '../../../gestion/utilisateurs/utilisateur.service';
import { PoinconService } from '../../../gestion/poincon/poincon.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-modifier-utilisation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.scss']
})
export class ModifierUtilisationComponent implements OnInit {
  form: FormGroup;
  id!: string;
  users: any[] = [];
  poincons: any[] = [];
  lotInput = new FormControl('');

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: UtilisationService,
    private userService: UtilisateurService,
    private poinconService: PoinconService
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
    this.id = this.route.snapshot.paramMap.get('id')!;

    this.userService.getAll().subscribe({
      next: data => this.users = data,
      error: err => console.error('Erreur chargement utilisateurs', err)
    });

    this.poinconService.getAll().subscribe({
      next: data => this.poincons = data,
      error: err => console.error('Erreur chargement poinçons', err)
    });

    this.service.getById(this.id).subscribe({
      next: data => {
        this.form.patchValue({
          compresseuse: data.compresseuse,
          nombreComprimes: data.nombreComprimes,
          emplacementRetour: data.emplacementRetour,
          commentaire: data.commentaire,
          poinconIds: data.poinconIds,
          userIds: data.userIds
        });

        this.lotNumbers.clear();
        data.lotNumbers?.forEach((lot: string) => this.lotNumbers.push(new FormControl(lot)));
      },
      error: err => {
        console.error('Erreur chargement utilisation', err);
        this.router.navigate(['/suivi/utilisation/liste']);
      }
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

  onSubmit(): void {
    if (this.form.valid) {
      this.service.update(this.id, this.form.value).subscribe({
        next: () => this.router.navigate(['/suivi/utilisation/liste']),
        error: err => console.error('Erreur mise à jour', err)
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/suivi/utilisation/liste']);
  }
}
