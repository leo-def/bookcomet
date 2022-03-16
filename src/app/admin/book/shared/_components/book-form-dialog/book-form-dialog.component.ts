import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Book } from 'src/app/core/_types/app/book/book';

@Component({
  selector: 'app-book-form-dialog',
  templateUrl: './book-form-dialog.component.html',
  styleUrls: ['./book-form-dialog.component.sass']
})
export class BookFormDialogComponent {
  
  formValue?: Book;

  constructor(
    public dialogRef: MatDialogRef<BookFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  get book() {
    const data = this.data;
    return data && data.formValue ? data.formValue : undefined
  }

  get disabled() {
    const data = this.data;
    return data && data.disabled;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(value?: Book) {
    this.dialogRef.close(value);
  }

  onBack() {
    this.dialogRef.close(null);
  }

}
