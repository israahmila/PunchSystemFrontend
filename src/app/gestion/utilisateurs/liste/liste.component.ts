import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UtilisateurService } from '../utilisateur.service';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatDialogActions } from '@angular/material/dialog';

@Component({
  selector: 'app-liste-utilisateurs',
  standalone: true,
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatDialogActions
  ]
})
export class ListeUtilisateursComponent implements OnInit {
  form: FormGroup;
  users: any[] = [];

  constructor(private fb: FormBuilder, private userService: UtilisateurService) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAll().subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error('Erreur chargement utilisateurs', err)
    });
  }

  toggleStatus(user: any): void {
    const updatedStatus = user.statut === 'Actif' ? 'Inactif' : 'Actif';
    this.userService.update(user.id, { statut: updatedStatus }).subscribe({
      next: () => user.statut = updatedStatus,
      error: (err) => console.error('Erreur modification statut', err)
    });
  }
  get permissionsArray() {
  return (this.form.get('permissions') as FormArray).controls;
}

  cancel() {
  this.form.reset();
}

submit() {
  console.log(this.form.value);
}
}
