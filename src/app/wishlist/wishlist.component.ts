import { Component, OnInit } from '@angular/core';
import { Book } from '../types/Book';
import { WishlistService } from '../services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  books: Book[] = [];

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.wishlistService.get().subscribe({
      next: (data) => {
        this.books = data;
      },

      error: (err) => {
        console.error('Error al obtener los libros:', err);
      },
    });
  }
}
