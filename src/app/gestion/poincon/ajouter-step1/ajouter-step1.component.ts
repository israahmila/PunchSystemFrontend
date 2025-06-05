import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { startWith, debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { PoinconService } from '../poincon.service';
import { MatCard, MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-ajouter-poincon-step1',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    // Angular Material
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    
  ],
  templateUrl: './ajouter-step1.component.html'
})
export class AjouterPoinconStep1Component {
  poinconForm: FormGroup;
  file?: File;
  dimensionsForm!: FormGroup;
  formeControl = new FormControl('');
  filteredFormes$!: Observable<string[]>;

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
  // Autocomplete streams
  marqueSuggestions$!: Observable<string[]>;
  fournisseurSuggestions$!: Observable<string[]>;

  constructor(private fb: FormBuilder, private poinconService: PoinconService) {
    this.poinconForm = this.fb.group({
      codeFormat: ['', Validators.required],
      codeGMAO: ['', Validators.required],
      identifiant: ['', Validators.required],

      marque: [''],
      fournisseur: [''],
      gravureSup: [''],
      gravureInf: [''],
      secabilite: [''],

    
      clavetage: [''],
      emplacementReception: [''],
      emplacementRetour: [''],
      status: [''],
      Forme: [''],
      Fournisseur: [''],
      nombrePoincon: [0],
      largeur: [0],
      longeur: [0],
      diametre: [0],
      GravureSup:[''],
      GravureInf:[''],
      Secabilite:[''],
      Clavetage:[''],
      EmplacementReception:[''],
      comment: [''],
      matrice: [''],
      referenceSup: [''],
      referenceInf: [''],

      dateFabrication: ['', Validators.required],
      dateReception: ['', Validators.required],
      dateMiseEnService: ['', Validators.required]
    }, { validators: this.dateValidator });

    this.setupAutocompleteFields();
  }

  private setupAutocompleteFields() {
    this.marqueSuggestions$ = this.setupAutocomplete('marque');
    this.fournisseurSuggestions$ = this.setupAutocomplete('fournisseur');
  }

  private setupAutocomplete(field: string): Observable<string[]> {
    return this.poinconForm.get(field)!.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => {
        if (typeof query === 'string' && query.trim()) {
          return this.poinconService.getSuggestions(field, query);
        }
        return of([]);
      })
    );
  }

  private dateValidator(group: FormGroup) {
    const fab = new Date(group.get('dateFabrication')?.value);
    const rec = new Date(group.get('dateReception')?.value);
    const mise = new Date(group.get('dateMiseEnService')?.value);
    return fab < rec && rec < mise ? null : { invalidDateOrder: true };
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  
}
