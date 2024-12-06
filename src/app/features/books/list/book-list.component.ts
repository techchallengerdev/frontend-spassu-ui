import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BookService } from '../../../core/services/book.service';
import { Book } from 'src/app/shared/interfaces/book.interface';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h1>Books</h1>
        <button mat-raised-button color="primary" routerLink="new">
          Add New Book
        </button>
      </div>

      <mat-table [dataSource]="books" class="mat-elevation-z8">
        <!-- Title Column -->
        <ng-container matColumnDef="title">
          <mat-header-cell *matHeaderCellDef>Title</mat-header-cell>
          <mat-cell *matCellDef="let book">{{ book.title }}</mat-cell>
        </ng-container>

        <!-- Author Column -->
        <ng-container matColumnDef="author">
          <mat-header-cell *matHeaderCellDef>Author</mat-header-cell>
          <mat-cell *matCellDef="let book">{{ book.author }}</mat-cell>
        </ng-container>

        <!-- Actions Column -->
        <ng-container matColumnDef="actions">
          <mat-header-cell *matHeaderCellDef>Actions</mat-header-cell>
          <mat-cell *matCellDef="let book">
            <button
              mat-icon-button
              color="primary"
              [routerLink]="['/v1/livros', book.id]"
            >
              <mat-icon>visibility</mat-icon>
            </button>
            <button
              mat-icon-button
              color="accent"
              [routerLink]="['/v1/livros', book.id, 'edit']"
            >
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button color="warn" (click)="deleteBook(book.id)">
              <mat-icon>delete</mat-icon>
            </button>
          </mat-cell>
        </ng-container>

        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row *matRowDef="let row; columns: displayedColumns"></mat-row>
      </mat-table>
    </div>
  `,
  styles: [
    `
      .mat-table {
        width: 100%;
      }
    `,
  ],
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  displayedColumns: string[] = ['title', 'author', 'actions'];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getAll().subscribe((books) => {
      this.books = books;
    });
  }

  deleteBook(id: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.delete(id).subscribe(() => {
        this.loadBooks();
      });
    }
  }
}
