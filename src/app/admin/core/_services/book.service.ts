import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CrudService } from 'src/app/core/_generics/crud-service';
import { Book } from 'src/app/core/_types/app/book/book';
import { BookFilter } from 'src/app/core/_types/app/book/book-filter';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService implements CrudService<Book, BookFilter> {

  static getUrl(id?: any): string {
    return `${environment.api.url.books}${id ? (id+'/') :''}`;
  }

  constructor(private http: HttpClient) { }

  fetch(params?: BookFilter): Observable<Array<Book>> {
    return this.http.get<Array<Book>>(
      BookService.getUrl(),
      { responseType: 'json', params: {...params} }
    );
  }

  create(item: Book): Observable<Book> {
    return this.http.post<Book>(BookService.getUrl(), item);
  }

  find(book: any): Observable<Book> {
    const id = this.getBookId(book);
    return this.http.get<Book>(BookService.getUrl(id));
  }

  update(book: any, item?: Book): Observable<Book> {
    const id = this.getBookId(book);
    return this.http.put<Book>(BookService.getUrl(id), item || book);
  }

  delete(book: any): Observable<Book | undefined> {
    const id = this.getBookId(book);
    return this.http.delete<Book>(BookService.getUrl(id));
  }

  private getBookId(book: any) {
    return book.id ? book.id : book;
  }

}
