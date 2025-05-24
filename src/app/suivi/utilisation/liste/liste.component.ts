// liste-utilisation.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilisationService } from '../utilisation.service';
import { Utilisation } from '../utilisation.model';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-liste-utilisation',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    RouterModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss']
})
export class ListeUtilisationComponent implements OnInit {
  utilisations: Utilisation[] = [];
  displayedColumns: string[] = ['reference', 'comprimeuse', 'nombreComprimés', 'dateUtilisation', 'actions'];
  loading = true;

  constructor(private service: UtilisationService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: data => {
        this.utilisations = data;
        this.loading = false;
      },
      error: err => {
        console.error('Erreur chargement utilisations', err);
        this.loading = false;
      }
    });
  }
}
