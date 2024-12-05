import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthorService } from '../../../core/services/author.service';
import { Author } from '../../../shared/interfaces/author.interface';

@Component({
  selector: 'app-author-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule
  ],
  template: `
    <div class="container mt-4">
      <mat-card *ngIf="author">
        <mat-card-header>
          <mat-card-title>{{author.firstName}} {{author.lastName}}</mat-card-title>
          <mat-card-subtitle>{{author.email}}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p><strong>Birth Date:</strong> {{author.birthDate | date}}</p>
          <p><strong>Biography:</strong></p>
          <p>{{author.biography}}</p>
          <div *ngIf="author.books && author.books.length">
            <p><strong>Books:</strong></p>
            <ul>
              <li *ngFor="let book of author.books">{{book}}</li>
            </ul>
          </div>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button [routerLink]="['/authors', author.id, 'edit']">EDIT</button>
          <button mat-button routerLink="/authors">BACK</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `
})
export class AuthorDetailComponent implements OnInit {
  author?: Author;

  constructor(
    private authorService: AuthorService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.authorService.getById(id).subscribe({
        next: (author) => this.author = author,
        error: (error) => console.error('Error loading author:', error)
      });
    }
  }
}
