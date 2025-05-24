// liste-entretiens.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EntretiensService } from '../../entretien.service';
import { Entretien } from '../../entretien.model';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { DialogAjouterModifierEntretienComponent } from '../../dialog-ajouter-modifier-entretien/dialog-ajouter-modifier-entretien.component';


@Component({
  selector: 'app-liste-entretiens',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss'],
  imports: [MatCard,MatCardTitle,MatCardContent,MatIcon,MatTableModule,CommonModule]
})
export class ListeEntretiensComponent implements OnInit {
  entretiens: Entretien[] = [];
  isLoading = true;

  constructor(
    private entretiensService: EntretiensService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadEntretiens();
  }

  loadEntretiens(): void {
    this.entretiensService.getAll().subscribe({
      next: (data) => {
        this.entretiens = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur de chargement', err);
        this.isLoading = false;
      }
    });
  }

  openAjouterDialog(): void {
    const dialogRef = this.dialog.open(DialogAjouterModifierEntretienComponent, {
      width: '600px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.entretiensService.create(result).subscribe({
          next: () => this.loadEntretiens(),
          error: (err) => console.error('Ajout échoué', err)
        });
      }
    });
  }

  openModifierDialog(entretien: Entretien): void {
    const dialogRef = this.dialog.open(DialogAjouterModifierEntretienComponent, {
      width: '600px',
      data: entretien
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.entretiensService.update(entretien.id!, result).subscribe({
          next: () => this.loadEntretiens(),
          error: (err) => console.error('Mise à jour échouée', err)
        });
      }
    });
  }

  supprimer(id: string): void {
    if (confirm('Supprimer cet entretien ?')) {
      this.entretiensService.delete(id).subscribe({
        next: () => this.loadEntretiens(),
        error: (err) => console.error('Suppression échouée', err)
      });
    }
  }
}
