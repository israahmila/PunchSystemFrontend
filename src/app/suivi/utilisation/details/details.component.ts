// details-utilisation.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilisationService } from '../utilisation.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Utilisation } from '../utilisation.model';
import { MatProgressSpinner } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-details-utilisation',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinner
  ]
})
export class DetailsUtilisationComponent implements OnInit {
  utilisation: Utilisation | null = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private utilisationService: UtilisationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.utilisationService.getOne(id).subscribe({
        next: (data) => {
          this.utilisation = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Erreur lors de la récupération de l\'utilisation', err);
          this.isLoading = false;
        }
      });
    }
  }

  back(): void {
    this.router.navigate(['/suivi/utilisation/liste']);
  }
}
