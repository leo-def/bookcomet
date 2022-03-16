import { Observable } from "rxjs";

export interface CrudService<T, K> {
    fetch(params?: K): Observable<Array<T>>;
    create(item: T): Observable<T>;
    find(id: any): Observable<T>;
    update(id: any, item: T): Observable<T>;
    delete(id: any): Observable<T | undefined>;
}