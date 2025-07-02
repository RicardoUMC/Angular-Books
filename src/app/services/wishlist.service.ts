import { Injectable } from '@angular/core';
import { Book } from '../types/Book';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private apiUrl = 'http://localhost:8080/api/wishlist';

  constructor(private http: HttpClient) {}

  get(): Observable<Book[]> {
    const userId = localStorage.getItem('userId');
    return this.http.get<Book[]>(`${this.apiUrl}?userId=${userId}`);
  }

  add(book: Book): Observable<any> {
    const userId = localStorage.getItem('userId');
    const payload = {
      ...book,
      userId: Number(userId),
    };
    return this.http.post(this.apiUrl, payload);
  }

  remove(bookId: number): Observable<any> {
    const userId = localStorage.getItem('userId');
    return this.http.delete(`${this.apiUrl}/${bookId}?userId=${userId}`);
  }

  check(bookId: number): Observable<{ isPresent: boolean }> {
    const userId = localStorage.getItem('userId');
    return this.http.get<{ isPresent: boolean }>(
      `${this.apiUrl}/check/${bookId}?userId=${userId}`
    );
  }
}
