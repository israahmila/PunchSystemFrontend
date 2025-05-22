import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilisationService } from '../utilisation.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface Utilisation {
  numero: string;
  date: Date;
  utilisateur: string;
  comprimeuse: string;
  produit: string;
  lot: string;
  commentaires: string;
}

@Component({
  selector: 'app-details-utilisation',
  standalone: true,
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class DetailsUtilisationComponent implements OnInit {
  utilisation: Utilisation | null = null;

  constructor(
    private route: ActivatedRoute,
    private utilisationService: UtilisationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.utilisationService.getOne(id).subscribe({
        next: (data) => {
          //this.utilisation = data;
        },
        error: (err) => {
          console.error('❌ Error fetching utilisation:', err);
          this.router.navigate(['/suivi/utilisation/liste']);
        }
      });
    } else {
      console.warn('Invalid ID in route');
      this.router.navigate(['/suivi/utilisation/liste']);
    }
  }

  goBack(): void {
    this.router.navigate(['/suivi/utilisation/liste']);
  }
}
