// liste-connexions.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ConnexionService } from './connexion.service';
import { ConnexionLog } from './connexion-log.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-liste-connexions',
  standalone: true,
  templateUrl: './liste-connexions.component.html',
  styleUrls: ['./liste-connexions.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatIconModule
  ]
})
export class ListeConnexionsComponent implements OnInit {
  connexions: ConnexionLog[] = [];
  isLoading = true;
  filterForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private connexionService: ConnexionService
  ) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      date: [''],
      login: ['']
    });
    this.loadConnexions();
  }

  loadConnexions(): void {
    this.connexionService.getAll().subscribe({
      next: (data) => {
        this.connexions = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur de chargement des connexions', err);
        this.isLoading = false;
      }
    });
  }

  filtrer(): void {
    const filters = this.filterForm.value;
    this.connexionService.getFiltered(filters).subscribe({
      next: (data) => this.connexions = data,
      error: (err) => console.error('Erreur filtrage', err)
    });
  }
}
