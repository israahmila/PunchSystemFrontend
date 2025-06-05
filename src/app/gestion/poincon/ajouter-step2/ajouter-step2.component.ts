import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { PoinconService } from '../poincon.service';

@Component({
  selector: 'app-ajouter-step2',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatAutocompleteModule,
    RouterModule
  ],
  templateUrl: './ajouter-step2.component.html',
  styleUrls: ['./ajouter-step2.component.scss']
})
export class AjouterPoinconStep2Component implements OnInit {
  dimensionsForm!: FormGroup;
  formeControl = new FormControl('');
  filteredFormes$!: Observable<string[]>;

  constructor(
    private fb: FormBuilder,
    private poinconService: PoinconService
  ) {}

  ngOnInit(): void {
    this.dimensionsForm = this.fb.group({
      forme: this.formeControl,
      diametre: [null, [Validators.min(0)]],
      largeur: [null, [Validators.min(0)]],
      longueur: [null, [Validators.min(0)]],
      epaisseur: [null, [Validators.min(0)]],
      hauteur: [null, [Validators.min(0)]]
    });

    this.filteredFormes$ = this.formeControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => {
        if (typeof value === 'string' && value.trim().length > 0) {
          return this.poinconService.getSuggestions('forme', value);
        }
        return of([]);
      })
    );
  }

  onFormeSelected(event: MatAutocompleteSelectedEvent) {
    const selected = event.option.value;
    this.formeControl.setValue(selected);
  }

  onSubmit() {
    if (this.dimensionsForm.valid) {
      const data = this.dimensionsForm.value;
      console.log('✅ Step 2 form submitted:', data);
      // proceed to final step or API call
    }
  }
}
