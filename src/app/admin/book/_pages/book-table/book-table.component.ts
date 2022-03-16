import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, concatMap, debounceTime, finalize, map, Observable, tap } from 'rxjs';
import { BookService } from 'src/app/admin/core/_services/book.service';
import { CrudActionsEnum } from 'src/app/core/_enums/crud-actions.enum';
import { MessageTypeEnum } from 'src/app/core/_enums/message-type.enum';
import { LoadingService } from 'src/app/core/_services/loading.service';
import { Book } from 'src/app/core/_types/app/book/book';
import { BookFilter } from 'src/app/core/_types/app/book/book-filter';
import { DeleteDialogComponent } from 'src/app/shared/_components/delete-dialog/delete-dialog.component';
import { BookFormDialogComponent } from '../../shared/_components/book-form-dialog/book-form-dialog.component';

@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.sass']
})
export class BookTableComponent implements OnInit {

  @Output() fetch: EventEmitter<BookFilter | undefined> = new EventEmitter<BookFilter | undefined>();

  filter?: BookFilter;
  books: Array<Book> = [];
  error: any;
  fetchedNumber: number = 0;
  displayedColumns: string[] = ['id','name','year', 'authors','actions'];
  page: number = 0;
  readonly pageSize: number = 3;
  get length(): number {
    return this.books ? this.books.length : 0
  }

  get fetched(): boolean {
    return this.fetchedNumber > 0;
  }

  get displayPages(): Array<Book> {
    return this.books.slice(
      this.page * this.pageSize, (this.page + 1) * this.pageSize);

  }

  private formDialogRef?: MatDialogRef<BookFormDialogComponent, Book>;
  private deleteDialogRef?: MatDialogRef<DeleteDialogComponent, Book>;

  constructor(
    private dialog: MatDialog,
    private bookService: BookService,
    private loadingService: LoadingService,
    private _snackBar: MatSnackBar
  ) {}
 
  ngOnInit(): void {
    this.fetch.pipe(
      debounceTime(25),
      map((filter?: BookFilter) =>  this.filter = (filter || this.filter)),
      concatMap((filter?: BookFilter) => this.fetchBooks(filter)),
      tap(() => this.incrementFetchedNumber()),
    ).subscribe();
    if(!this.fetched) {
      this.nextFetch();
    }
  }

  
  selectPage(page: PageEvent) {
    this.page = page.pageIndex;
  }

  filterChanges(filter: BookFilter) {
    this.nextFetch(filter)
  }
  
  openCreateDialog(): void {
    const formDialogRef = this.dialog.open(BookFormDialogComponent, {
      width: '500px',
      data: {
        title: '',
        noText: '',
        okText: '',
        formValue: {}
      },
    });
    formDialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.createBook(result as Book).subscribe()
      }
    });
  }
  
  openEditDialog(book: Book): void {
    const formDialogRef = this.dialog.open(BookFormDialogComponent, {
      width: '500px',
      data: {
        title: '',
        noText: '',
        okText: '',
        formValue: book
      },
    });
    formDialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.updateBook(result as Book).subscribe()
      }
    });
  }

  openShowDialog(book: Book): void {
    const formDialogRef = this.dialog.open(BookFormDialogComponent, {
      width: '500px',
      data: {
        title: '',
        noText: '',
        okText: '',
        formValue: book,
        disabled: true
      },
    });
    formDialogRef.afterClosed().subscribe(result => {
      this.nextFetch();
    });
  }

  openDeleteDialog(book: Book): void {
    const deleteDialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '350px',
      data: {
        item: book
      }
    });
    deleteDialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.deleteBook(book).subscribe()
      }
    });
  }

  protected fetchBooks(params?: BookFilter) {
    this.startLoading();
    return this.bookService.fetch(params).pipe(
      tap((result: Array<Book>) => this.setBooks(result)),
      catchError((err: any, caught: Observable<Book[]>) => {
        this.handleError(err, CrudActionsEnum.fetch);
        return caught;
      }),
      finalize( () => this.stopLoading())
    )
  }

  protected deleteBook(book: Book) {
    this.startLoading();
    return this.bookService.delete(book).pipe(
      tap((item: any) => this.showSuccess(item, CrudActionsEnum.delete)),
      tap(() => this.nextFetch()),
      catchError((err: any, caught: Observable<Book | undefined>) => {
        this.handleError(err, CrudActionsEnum.delete);
        return caught;
      }),
      finalize( () => this.stopLoading())
    )
  }

  protected createBook(book: Book) {
    this.startLoading();
    return this.bookService.create(book).pipe(
      tap((item: any) => this.showSuccess(item, CrudActionsEnum.create)),
      tap(() => this.nextFetch()),
      catchError((err: any, caught: Observable<Book | undefined>) => {
        this.handleError(err, CrudActionsEnum.create);
        return caught;
      }),
      finalize( () => this.stopLoading())
    )
  }

  protected updateBook(book: Book) {
    this.startLoading();
    return this.bookService.update(book).pipe(
      tap((item: any) => this.showSuccess(item, CrudActionsEnum.update)),
      tap(() => this.nextFetch()),
      catchError((err: any, caught: Observable<Book | undefined>) => {
        this.handleError(err, CrudActionsEnum.update);
        return caught;
      }),
      finalize( () => this.stopLoading())
    )
  }

  protected nextFetch(filter?: BookFilter) {
    this.fetch.next(filter)
  }

  protected incrementFetchedNumber() {
    this.fetchedNumber += 1;
  }

  protected setBooks(result: Array<Book>) {
    this.books = result;
  }

  protected startLoading() {
    this.loadingService.startLoading();
  }

  protected stopLoading() {
    this.loadingService.stopLoading();
  }

  protected showSuccess(item: any, action: CrudActionsEnum) {
    this.showMessage('success', MessageTypeEnum.success);
  }

  protected handleError(err: any, action: CrudActionsEnum) {
    this.showMessage('error', MessageTypeEnum.error);
    this.error = err;
  }

  protected showMessage (msg: string, type?: MessageTypeEnum){
    this._snackBar.open(`${type} - ${msg}`, 'OK', { duration: 2000 });
  }

}
