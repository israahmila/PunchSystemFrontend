import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-forbidden',
  imports: [CommonModule, RouterModule],
  template: `
    <div class="forbidden">
      <h1>403 - Forbidden</h1>
      <p>You do not have permission to access this page.</p>
      <a routerLink="/">Go to Dashboard</a>
    </div>
  `,
  styles: [`
    .forbidden {
      text-align: center;
      padding: 4rem;
    }
  `]
})
export class ForbiddenComponent {}
