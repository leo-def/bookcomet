import { Component, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { tap } from 'rxjs';
import { BookFilter } from 'src/app/core/_types/app/book/book-filter';

@Component({
  selector: 'app-book-filter',
  templateUrl: './book-filter.component.html',
  styleUrls: ['./book-filter.component.sass']
})
export class BookFilterComponent implements OnInit {

  @Optional() @Input() value?: BookFilter;
  form?: FormGroup;
  @Output() valueChanges: EventEmitter<BookFilter> 
    = new EventEmitter<BookFilter>();

  constructor() {
   }

  ngOnInit(): void {
    
    const form = new FormGroup({
      name: new FormControl('')
    });
    form.valueChanges.pipe(
      tap((values: any) => this.valueChanges.next(values as BookFilter))
    ).subscribe();
    this.form = form;
  }

  reset(){
    if(this.form){
      this.form.setValue({ name: ''} as BookFilter);
    }
  }

}
