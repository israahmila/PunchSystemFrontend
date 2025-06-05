import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoinconService } from '../poincon.service';
import { PoinconWizardService } from '../poincon-wizard.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-modifier-step1',
  templateUrl: './modifier-step1.component.html',
  imports: [CommonModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatCardModule,MatSelectModule,MatIconModule],
  styleUrls: ['./modifier-step1.component.scss']
})
export class ModifierStep1Component implements OnInit {
  form!: FormGroup;
  uploadedFileName: string | null = null;
  id!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private poinconService: PoinconService,
    private wizard: PoinconWizardService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']; // Access the 'id' parameter from the URL
    });
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
      commentaire: ['']
    });

    this.poinconService.getById(this.id).subscribe(data => {
      this.form.patchValue(data);
      this.uploadedFileName = data.ficheTechniqueName || 'Fichier existant';
      this.wizard.existingData = data;
    });
  }

  next() {
    this.wizard.step1Data = this.form.value;
    this.router.navigate([`/gestion/poincon/modifier/${this.id}/step2`]);
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.wizard.file = file;
      this.uploadedFileName = file.name;
    }
  }

  removeFile() {
    this.wizard.file = null;
    this.uploadedFileName = null;
  }
}
