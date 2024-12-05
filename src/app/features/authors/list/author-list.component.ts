import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthorService } from '../../../core/services/author.service';
import { Author } from '../../../shared/interfaces/author.interface';

@Component({
  selector: 'app-author-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h1>Authors</h1>
        <button mat-raised-button color="primary" routerLink="new">
          Add New Author
        </button>
      </div>

      <mat-table [dataSource]="authors" class="mat-elevation-z8">
        <ng-container matColumnDef="name">
          <mat-header-cell *matHeaderCellDef>Name</mat-header-cell>
          <mat-cell *matCellDef="let author">{{author.firstName}} {{author.lastName}}</mat-cell>
        </ng-container>

        <ng-container matColumnDef="email">
          <mat-header-cell *matHeaderCellDef>Email</mat-header-cell>
          <mat-cell *matCellDef="let author">{{author.email}}</mat-cell>
        </ng-container>

        <ng-container matColumnDef="birthDate">
          <mat-header-cell *matHeaderCellDef>Birth Date</mat-header-cell>
          <mat-cell *matCellDef="let author">{{author.birthDate | date}}</mat-cell>
        </ng-container>

        <ng-container matColumnDef="actions">
          <mat-header-cell *matHeaderCellDef>Actions</mat-header-cell>
          <mat-cell *matCellDef="let author">
            <button mat-icon-button color="primary" [routerLink]="[author.id]">
              <mat-icon>visibility</mat-icon>
            </button>
            <button mat-icon-button color="accent" [routerLink]="[author.id, 'edit']">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button color="warn" (click)="deleteAuthor(author.id)">
              <mat-icon>delete</mat-icon>
            </button>
          </mat-cell>
        </ng-container>

        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
      </mat-table>
    </div>
  `,
  styles: [`
    .mat-table {
      width: 100%;
    }
  `]
})
export class AuthorListComponent implements OnInit {
  authors: Author[] = [];
  displayedColumns: string[] = ['name', 'email', 'birthDate', 'actions'];

  constructor(private authorService: AuthorService) {}

  ngOnInit(): void {
    this.loadAuthors();
  }

  loadAuthors(): void {
    this.authorService.getAll().subscribe({
      next: (data) => this.authors = data,
      error: (error) => console.error('Error loading authors:', error)
    });
  }

  deleteAuthor(id: number): void {
    if (confirm('Are you sure you want to delete this author?')) {
      this.authorService.delete(id).subscribe({
        next: () => this.loadAuthors(),
        error: (error) => console.error('Error deleting author:', error)
      });
    }
  }
}
