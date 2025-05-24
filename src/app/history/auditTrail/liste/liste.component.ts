// liste-audit.component.ts
import { Component, OnInit } from '@angular/core';
import { AuditService } from '../audit.service';
import { AuditEntry } from '../audit-entry.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-liste-audit',
  standalone: true,
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCardModule
  ]
})
export class ListeAuditComponent implements OnInit {
  audits: AuditEntry[] = [];
  isLoading = true;
  filterForm!: FormGroup;

  constructor(
    private auditService: AuditService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      date: [''],
      utilisateur: [''],
      module: [''],
      operation: ['']
    });
    this.loadAudits();
  }

  loadAudits(): void {
    this.isLoading = true;
    this.auditService.getAll().subscribe({
      next: (data) => {
        this.audits = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur chargement audit trail', err);
        this.isLoading = false;
      }
    });
  }

  filtrer(): void {
    const filters = this.filterForm.value;
    this.auditService.getFiltered(filters).subscribe({
      next: (data) => this.audits = data,
      error: (err) => console.error('Erreur filtrage', err)
    });
  }
}
