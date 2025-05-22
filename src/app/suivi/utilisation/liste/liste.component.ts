import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UtilisationService } from '../utilisation.service';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

interface Utilisation {
  numero: string;
  date: Date;
  utilisateur: string;
  comprimeuse: string;
  produit: string;
  lot: string;
}

@Component({
  selector: 'app-liste-utilisations',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatSortModule,
    MatToolbarModule
  ],
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss']
})
export class ListeUtilisationsComponent implements OnInit {
  displayedColumns = ['numero', 'date', 'utilisateur', 'comprimeuse', 'produit', 'lot', 'actions'];
  dataSource: MatTableDataSource<Utilisation> = new MatTableDataSource<Utilisation>();
  utilisateurs = ['Alice', 'Bob', 'Charlie'];
  comprimeuses = ['Comprimeuse A', 'Comprimeuse B'];
  produits = ['Produit X', 'Produit Y'];

  filters = {
    date: '',
    utilisateur: '',
    comprimeuse: '',
    produit: '',
    lot: '',
    searchTerm: ''
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public router: Router, private utilisationService: UtilisationService) {}

  ngOnInit(): void {
    this.fetchUtilisations();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;  // ✅ Set the sort here
  }
  fetchUtilisations() {
    // Replace this with your actual API call
    const data: Utilisation[] = [
      { numero: 'U001', date: new Date(), utilisateur: 'Alice', comprimeuse: 'Comprimeuse A', produit: 'Produit X', lot: 'L123' },
      { numero: 'U002', date: new Date(), utilisateur: 'Bob', comprimeuse: 'Comprimeuse B', produit: 'Produit Y', lot: 'L456' },
      { numero: 'U003', date: new Date(), utilisateur: 'Charlie', comprimeuse: 'Comprimeuse A', produit: 'Produit X', lot: 'L789' }
    ];

    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  exporter() {
    const csvData = this.dataSource.filteredData
      .map(row => Object.values(row).join(","))
      .join("\n");
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "utilisations.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  ajouter() {
    this.router.navigate(['/suivi/utilisation/ajouter']);

  }

  edit(id: string) {
    this.router.navigate(['/suivi/utilisation/modifier', id]);

  }

  delete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette utilisation ?')) {
      this.utilisationService.delete(id).subscribe({
        next: () => {
          this.fetchUtilisations(); // Recharge la liste après suppression
        },
        error: (err) => {
          console.error('Erreur lors de la suppression :', err);
        }
      });
    }
  }
  goToDetails(id: number): void {
    this.router.navigate(['/suivi/utilisation/details', id]);
  }
}
