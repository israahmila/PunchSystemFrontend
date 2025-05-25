// details-utilisation.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UtilisationService } from '../utilisation.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-details-utilisation',
  standalone: true,
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  imports: [CommonModule, MatCardModule, MatButtonModule]
})
export class DetailsUtilisationComponent implements OnInit {
  id!: string;
  utilisation: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: UtilisationService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.service.getById(this.id).subscribe({
      next: (data) => {
        this.utilisation = data;
      },
      error: (err) => {
        console.error('Erreur chargement détails utilisation', err);
        this.router.navigate(['/suivi/utilisation/liste']);
      }
    });
  }

  retour(): void {
    this.router.navigate(['/suivi/utilisation/liste']);
  }
}
