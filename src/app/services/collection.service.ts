import { Injectable } from '@angular/core';
import { Book } from '../types/Book';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  private apiUrl = 'http://localhost:8080/api/collection';

  constructor(private http: HttpClient) {}

  get(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  add(book: Book): Observable<any> {
    return this.http.post(this.apiUrl, book);
  }

  remove(bookId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${bookId}`);
  }

  check(bookId: number): Observable<{ isPresent: boolean }> {
    return this.http.get<{ isPresent: boolean }>(
      `${this.apiUrl}/check/${bookId}`
    );
  }
}