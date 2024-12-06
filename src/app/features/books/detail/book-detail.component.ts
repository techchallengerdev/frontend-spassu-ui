// src/app/features/books/detail/book-detail.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BookService } from '../../../core/services/book.service';
import { Book } from 'src/app/shared/interfaces/book.interface';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  template: `
    <div class="container mt-4">
      <mat-card *ngIf="book">
        <mat-card-header>
          <mat-card-title>{{ book.title }}</mat-card-title>
          <mat-card-subtitle>By {{ book.author }}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p><strong>ISBN:</strong> {{ book.isbn }}</p>
          <p><strong>Published Year:</strong> {{ book.publishedYear }}</p>
          <p><strong>Genre:</strong> {{ book.genre }}</p>
          <p><strong>Available:</strong> {{ book.available ? 'Yes' : 'No' }}</p>
          <p><strong>Description:</strong></p>
          <p>{{ book.description }}</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button [routerLink]="['/books', book.id, 'edit']">
            EDIT
          </button>
          <button mat-button routerLink="/books">BACK</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
})
export class BookDetailComponent implements OnInit {
  book?: Book;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.bookService.getById(id).subscribe({
        next: (book) => (this.book = book),
        error: (error) => console.error('Error loading book:', error),
      });
    }
  }
}
