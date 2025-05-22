import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoinconService } from '../poincon.service';
import { Poincon } from '../poincon.model';
import {
  CommonModule,
  NgIf,
  NgFor
} from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-details-poincon',
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
export class DetailsComponent implements OnInit {
  poincon: Poincon | null = null;

  constructor(
    private route: ActivatedRoute,
    private poinconService: PoinconService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.poinconService.getOne(id).subscribe({
        next: (data) => {
          this.poincon = data;
        },
        error: (err) => {
          console.error('❌ Error fetching poinçon:', err);
          this.router.navigate(['/gestion/poincon/liste']);
        }
      });
    } else {
      console.warn('Invalid ID in route');
      this.router.navigate(['/gestion/poincon/liste']);
    }
  }
  

  openFiche(): void {
    if (this.poincon?.ficheTechniqueUrl) {
      window.open(this.poincon.ficheTechniqueUrl, '_blank');
    }
  }

  goBack(): void {
    this.router.navigate(['/gestion/poincon/liste']);
  }
}
