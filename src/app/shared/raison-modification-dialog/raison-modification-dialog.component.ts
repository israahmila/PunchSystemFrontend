import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-raison-modification-dialog',
  templateUrl: './raison-modification-dialog.component.html',
  standalone: true,
  imports: [
    // Import everything needed here
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class RaisonModificationDialogComponent {
  reason = '';

  constructor(private dialogRef: MatDialogRef<RaisonModificationDialogComponent>) {}

  submit() {
    if (this.reason.trim()) {
      this.dialogRef.close(this.reason); // Return the reason
    }
  }

  cancel() {
    this.dialogRef.close(); // User cancelled
  }
}
