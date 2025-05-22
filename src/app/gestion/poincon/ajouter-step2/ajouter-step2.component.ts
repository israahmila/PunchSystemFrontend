import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PoinconWizardService } from '../poincon-wizard.service';
import { MatSelectModule } from '@angular/material/select'

import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter-step2',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,MatSelectModule],
  templateUrl: './ajouter-step2.component.html',
  styleUrl: './ajouter-step2.component.scss'
})
export class AjouterStep2Component {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private wizard: PoinconWizardService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: [1, [Validators.required, Validators.min(1)]],
      matrice: [''],
      largeur: [1],
      longueur: [1],
      refSup: [''],
      refInf: [''],
      diametre: [1],
      chAdm: [''],
      status: ['a']
    });
  }

  next() {
    const { nombre, ...base } = this.form.value;
    const merged = { ...this.wizard.step1Data, ...base };
    this.wizard.step2Data = { nombre, base };
    this.wizard.generated = Array.from({ length: nombre }, () => ({ ...merged }));
    this.router.navigate(['/gestion/poincon/ajouter/step3']);
  }
}
