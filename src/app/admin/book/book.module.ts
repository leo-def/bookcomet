import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table'
;import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { BookTableComponent } from './_pages/book-table/book-table.component';
import { BookRoutingModule } from './book-routing.module';

@NgModule({
  declarations: [
    BookTableComponent
  ],
  imports: [
    BookRoutingModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    // Material
    MatTableModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ]
})
export class BookModule { }
