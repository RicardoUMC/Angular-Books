import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../types/Book';
import { CollectionService } from '../services/collection.service';
import { WishlistService } from '../services/wishlist.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  @Input() book: Book = {} as Book;

  isInCollection: boolean = false;
  isInWishlist: boolean = false;

  constructor(
    private collectionService: CollectionService,
    private wishService: WishlistService
  ) {}

  ngOnInit(): void {
    this.collectionService.check(this.book.id).subscribe({
      next: (res) => {
        console.log(res);
        this.isInCollection = res.isPresent;
      },
      error: (err) => {
        console.error('Error al verificar la colección', err);
        this.isInCollection = false;
      },
    });

    this.wishService.check(this.book.id).subscribe({
      next: (res) => {
        console.log(res);
        this.isInWishlist = res.isPresent;
      },
      error: (err) => {
        console.error('Error al verificar la lista de deseados', err);
        this.isInWishlist = false;
      },
    });
  }

  addToCollection(): void {
    this.collectionService.add(this.book).subscribe({
      next: () => {
        this.isInCollection = true;
      },
      error: (err) => {
        console.error('Error al agregar a la colección:', err);
      },
    });
  }

  removeFromCollection(): void {
    this.collectionService.remove(this.book.id).subscribe({
      next: () => {
        this.isInCollection = false;
      },
      error: (err) => {
        console.error('Error al remover de la colección:', err);
      },
    });
  }

  addToWishlist(): void {
    this.wishService.add(this.book).subscribe({
      next: () => {
        this.isInWishlist = true;
      },
      error: (err) => {
        console.error('Error al agregar a la lista de deseados:', err);
      },
    });
  }

  removeFromWishlist(): void {
    this.wishService.remove(this.book.id).subscribe({
      next: () => {
        this.isInWishlist = false;
      },
      error: (err) => {
        console.error('Error al remover de la lista de deseados:', err);
      },
    });
  }
}
