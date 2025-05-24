// liste-utilisateurs.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { User } from '../utilisateur.model';
import { UtilisateurService } from '../utilisateur.service';
import { DialogAjouterModifierUtilisateurComponent } from '../dialog-ajouter-modifier-utilisateur/dialog-ajouter-modifier-utilisateur.component';
import { DialogGestionPermissionsComponent } from '../dialog-gestion-permissions/dialog-gestion-permissions.component';

@Component({
  selector: 'app-liste-utilisateurs',
  standalone: true,
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss'],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatCardModule
  ]
})
export class ListeUtilisateursComponent implements OnInit {
  utilisateurs: User[] = [];
  isLoading = true;

  constructor(
    private utilisateurService: UtilisateurService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadUtilisateurs();
  }

  loadUtilisateurs(): void {
    this.utilisateurService.getAll().subscribe({
      next: (data) => {
        this.utilisateurs = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur chargement utilisateurs', err);
        this.isLoading = false;
      }
    });
  }

  openAjouter(): void {
    const dialogRef = this.dialog.open(DialogAjouterModifierUtilisateurComponent, {
      width: '500px',
      data: null
    });
    dialogRef.afterClosed().subscribe(res => res && this.loadUtilisateurs());
  }

  openModifier(utilisateur: User): void {
    const dialogRef = this.dialog.open(DialogAjouterModifierUtilisateurComponent, {
      width: '500px',
      data: utilisateur
    });
    dialogRef.afterClosed().subscribe(res => res && this.loadUtilisateurs());
  }

  openPermissions(utilisateur: User): void {
    this.dialog.open(DialogGestionPermissionsComponent, {
      width: '800px',
      data: utilisateur
    });
  }

  supprimer(id: string): void {
    if (confirm('Supprimer cet utilisateur ?')) {
      this.utilisateurService.delete(id).subscribe(() => this.loadUtilisateurs());
    }
  }
}
