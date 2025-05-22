import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'
import { PoinconWizardService } from '../poincon-wizard.service';
import { Router } from '@angular/router';
import { PoinconService } from '../poincon.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone:true,
  selector: 'app-ajouter-step1',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './ajouter-step1.component.html',
  styleUrl: './ajouter-step1.component.scss'
})
export class AjouterStep1Component{
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private wizard: PoinconWizardService,
    private poinconService : PoinconService,
    private router: Router
  ) {
    this.form = this.fb.group({
      codeFormat: ['', Validators.required],
      forme: [''],
      marque: [''],
      codeGMAO: [''],
      fournisseur: [''],
      gravureSup: [''],
      gravureInf: [''],
      secabilite: [''],
      clavetage: [''],
      emplacementReception: [''],
      dateReception: [''],
      dateFabrication: [''],
      dateMiseEnService: [''],
      commentaire: [''],
      ficheTechnique: [null]
    });
  }

  next() {
    this.wizard.step1Data = this.form.value;
    this.router.navigate(['gestion/poincon/ajouter/step2']);
  }

  uploadedFileName: string | null = null;

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      this.wizard.file = file; // 🧠 You already have this

      this.uploadedFileName = file.name; // 🎉 Show file name
    }
  }
  removeFile() {
    this.wizard.file = null;
    this.uploadedFileName = null;
  }
  

}
