import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoinconService } from '../poincon.service';
import { Poincon } from '../poincon.model';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule }from '@angular/material/toolbar';

@Component({
  selector: 'app-liste-poincon',
  standalone: true,
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule
  ],
})
export class ListeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'codeFormat', 'forme', 'fournisseur', 'emplacementReception', 'actions'];
  dataSource = new MatTableDataSource<Poincon>();
  searchTerm = '';

  constructor(public router: Router, private poinconService: PoinconService) {}

  ngOnInit(): void {
    this.poinconService.getAll().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  goToDetails(id: string): void {
    this.router.navigate(['/gestion/poincon/details', id]);
  }

  deletePoincon(id: string): void {
    if (confirm('Supprimer ce poinçon ?')) {
      this.poinconService.delete(id).subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter(p => p.id !== id);
      });
    }
  }

  ajouter(): void {
    this.router.navigate(['/gestion/poincon/ajouter/step1']);
  }

  exporter(): void {
    const csvData = this.dataSource.filteredData
      .map(row => Object.values(row).join(","))
      .join("\n");
      
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "poincons.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  
}
