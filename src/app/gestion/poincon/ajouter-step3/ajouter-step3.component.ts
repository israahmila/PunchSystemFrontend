import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'
import { PoinconWizardService } from '../poincon-wizard.service';
import { MatCardModule } from '@angular/material/card';
import { PoinconService } from '../poincon.service';
import { Route, Router } from '@angular/router';
import { Poincon } from '../poincon.model';

@Component({
  selector: 'app-ajouter-step3',
  imports: [CommonModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatCardModule,MatSelectModule],
  templateUrl: './ajouter-step3.component.html',
  styleUrl: './ajouter-step3.component.scss'
})
export class AjouterStep3Component implements OnInit{
  form!: FormGroup;

  constructor(private fb: FormBuilder, private wizard: PoinconWizardService, private poinconService : PoinconService,private router : Router) {}

  ngOnInit() {
    const array = this.wizard.generated.map((p: Poincon) =>
      this.fb.group({
        codeFormat: [p.codeFormat],
        forme: [p.forme],
        marque: [p.marque],
        codeGMAO: [p.codeGMAO],
        fournisseur: [p.fournisseur],
        gravureSup: [p.gravureSup],
        gravureInf: [p.gravureInf],
        secabilite: [p.secabilite],
        clavetage: [p.clavetage],
        emplacementReception: [p.emplacementReception],
        dateReception: [p.dateReception],
        dateFabrication: [p.dateFabrication],
        dateMiseEnService: [p.dateMiseEnService],
        commentaire: [p.commentaire],
        matrice: [p.matrice],
        largeur: [p.largeur],
        longueur: [p.longueur],
        refSup: [p.refSup],
        refInf: [p.refInf],
        diametre: [p.diametre],
        chAdm: [p.chAdm],
        status: [p.status]
      })
    );
  
    this.form = this.fb.group({
      poincons: this.fb.array(array)
    });
  }

  get poincons(): FormArray {
    return this.form.get('poincons') as FormArray;
  }

  get controls(): FormGroup[] {
    return this.poincons.controls as FormGroup[];
  }

  submit() {
    if (!this.wizard.file) {
      alert('Veuillez ajouter une fiche technique.');
      return;
    }
  
    this.poinconService.uploadFiche(this.wizard.file).subscribe({
      next: res => {
        const url = res.url;
        const finalData = this.form.value.poincons.map((p: Poincon) => ({ ...p, ficheTechniqueUrl: url }));

  
        this.poinconService.addMany(finalData).subscribe({
          next: () => {
            alert('✅ Tous les poinçons ont été créés.');
            this.router.navigate(['/dashboard']);
          },
          error: err => {
            console.error('❌ Batch upload failed:', err);
            alert('Erreur lors de la création des poinçons');
          }
        });
      },
      error: err => {
        console.error('❌ Upload fiche failed:', err);
        alert('Erreur lors de l’upload du fichier.');
      }
    });
  }
  
  
}
