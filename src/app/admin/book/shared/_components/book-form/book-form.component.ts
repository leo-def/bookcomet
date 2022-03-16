import { Component, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from 'src/app/core/_types/app/book/book';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { combineLatest, concat, merge, of, tap } from 'rxjs';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.sass']
})
export class BookFormComponent implements OnInit {
  
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  @Optional() @Input() disabled: boolean = false;
  @Optional() @Input() book?: Book;
  @Output() formSubmit: EventEmitter<Book> = new EventEmitter<Book>();

  authors: Array<string> = [];
  form?: FormGroup;
  authorsControl?: FormControl;
  
  constructor() { }

  ngOnInit(): void {
    const book = this.book;
    const disabled = this.disabled;
    const authorsControl = new FormControl(book && book.authors ? book.authors : []);
    const idControl = new FormControl(book && book.id ? book.id : null);
    const form = new FormGroup({
      name: new FormControl((book && book.name ? book.name : ''), [Validators.required]),
      year: new FormControl((book && book.year ? book.year : null), [Validators.required]),
      authors: authorsControl,
      summary: new FormControl((book && book.summary ? book.summary : ''), [Validators.required]),
      id: idControl
    });
    idControl.disable()
    if(disabled){
      form.disable();
    }
    this.authors = authorsControl.value;
    authorsControl.valueChanges.pipe(
      tap((authors: any) => this.authors = authors as Array<string>)
    ).subscribe();
    this.form = form;
    this.authorsControl = authorsControl;
  }

  updateAuthors(authors: Array<string>) {
    if(this.authorsControl) {
      this.authorsControl.setValue(authors);
    }
  }

  onSubmit() {
    const value: Book = this.form?.getRawValue() as Book
    this.formSubmit.next(value)
  }


  add(event: MatChipInputEvent): void {
    const authors = [...this.authors];
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      authors.push(value);
      this.updateAuthors(authors);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(author: string): void {
    const authors = [...this.authors];
    const index = authors.indexOf(author);

    if (index >= 0) {
      authors.splice(index, 1);
      this.updateAuthors(authors);
    }
  }

}
