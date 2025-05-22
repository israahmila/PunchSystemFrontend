import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoinconWizardService } from '../poincon-wizard.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { PoinconService } from '../poincon.service';

@Component({
  selector: 'app-modifier-step2',
  templateUrl: './modifier-step2.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule
  ],
  styleUrls: ['./modifier-step2.component.scss']
})
export class ModifierStep2Component implements OnInit {
  form!: FormGroup;
  id!: number;

  constructor(
    private fb: FormBuilder,
    private wizard: PoinconWizardService,
    private route: ActivatedRoute,
    private router: Router,
    private poinconService: PoinconService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.form = this.fb.group({
      matrice: [''],
      largeur: [''],
      longueur: [''],
      refSup: [''],
      refInf: [''],
      diametre: [''],
      chAdm: [''],
      status: ['']
    });

    // Pre-fill form with existing data if available
    if (this.wizard.existingData) {
      this.form.patchValue(this.wizard.existingData);
    }
  }

  next(): void {
    // Combine step1Data and form value without destructuring 'file'
    const updatedData = {
      ...(this.wizard.step1Data || {}), // Handle null safely
      ...this.form.value
    };

    // Handle file upload if present
    if (this.wizard.file) {
      this.poinconService.uploadFiche(this.wizard.file).subscribe({
        next: (res) => {
          updatedData.ficheTechniqueUrl = res.url; // Add URL to data
          this.submitUpdate(updatedData);
        },
        error: (err) => {
          console.error('❌ File upload failed:', err);
        }
      });
    } else {
      this.submitUpdate(updatedData);
    }
  }

  submitUpdate(data: any): void {
    console.log('Sending data to update:', data); // Debug log
    this.poinconService.update(this.id, data).subscribe({
      next: () => {
        console.log('✅ Update successful');
        this.router.navigate(['/gestion/poincon/liste']);
      },
      error: (err) => {
        console.error('❌ Update failed:', err);
      }
    });
  }
}