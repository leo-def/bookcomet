import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NotFoundComponent } from './_components/not-found/not-found.component';
import { DeleteDialogComponent } from './_components/delete-dialog/delete-dialog.component';
import { LoadingComponent } from './_components/loading/loading.component';

@NgModule({
  declarations: [
    NotFoundComponent,
    DeleteDialogComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    // Material
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressBarModule
  ],
  exports: [
    // Modules
    CommonModule,
    // Components
    NotFoundComponent,
    DeleteDialogComponent,
    LoadingComponent
  ]
})
export class SharedModule { }
