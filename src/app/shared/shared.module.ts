import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotFoundComponent } from './_components/not-found/not-found.component';
import { DeleteDialogComponent } from './_components/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [
    NotFoundComponent,
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    // Material
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  exports: [
    // Modules
    CommonModule,
    // Components
    NotFoundComponent,
    DeleteDialogComponent,
  ]
})
export class SharedModule { }
