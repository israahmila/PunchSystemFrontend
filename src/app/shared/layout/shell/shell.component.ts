import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { NgIf } from '@angular/common';
import { MatExpansionModule} from '@angular/material/expansion';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatExpansionModule,
    RouterModule
  ]
})
export class ShellComponent {
  logout() {
    localStorage.removeItem('token');
    location.href = '/login';
  }
  debugClick(label: string) {
    console.log('Clicked:', label);
  }
  
}
