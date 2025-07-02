import { Component, OnInit } from '@angular/core';
import { Book } from '../types/Book';
import { CollectionService } from '../services/collection.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
})
export class CollectionComponent implements OnInit {
  books: Book[] = [];

constructor(private collectionService: CollectionService) {}

  ngOnInit(): void {
    this.collectionService.get().subscribe({
      next: (data) => {
        this.books = data;
      },

      error: (err) => {
        console.error('Error al obtener los libros:', err);
      },
    });
  }
}
