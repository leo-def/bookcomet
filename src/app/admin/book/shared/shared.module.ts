import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule as AdminSharedModule } from '../../shared/shared.module';
import { BookFilterComponent } from './_components/book-filter/book-filter.component';
import { BookFormComponent } from './_components/book-form/book-form.component';
import { BookFormDialogComponent } from './_components/book-form-dialog/book-form-dialog.component';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [
    BookFilterComponent,
    BookFormComponent,
    BookFormDialogComponent
  ],
  imports: [
    AdminSharedModule,
    FlexLayoutModule,
    // Form
    ReactiveFormsModule,
    FormsModule,
    // Material
    MatInputModule,
    MatChipsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    AdminSharedModule,
    // Components
    BookFilterComponent,
    BookFormComponent
  ]
})
export class SharedModule { }
