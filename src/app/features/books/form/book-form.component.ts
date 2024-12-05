import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../../core/services/book.service';
import { Book } from '../../../shared/interfaces/book.interface';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  template: `
    <div class="container mt-4">
      <h1>{{isEditing ? 'Edit' : 'Create'}} Book</h1>
      
      <form [formGroup]="bookForm" (ngSubmit)="onSubmit()" class="mt-4">
        <mat-form-field class="w-100 mb-3">
          <mat-label>Title</mat-label>
          <input matInput formControlName="title" placeholder="Book title">
        </mat-form-field>

        <mat-form-field class="w-100 mb-3">
          <mat-label>Author</mat-label>
          <input matInput formControlName="author" placeholder="Author name">
        </mat-form-field>

        <mat-form-field class="w-100 mb-3">
          <mat-label>ISBN</mat-label>
          <input matInput formControlName="isbn" placeholder="ISBN">
        </mat-form-field>

        <mat-form-field class="w-100 mb-3">
          <mat-label>Description</mat-label>
          <textarea matInput formControlName="description" placeholder="Book description" rows="4"></textarea>
        </mat-form-field>

        <div class="mt-4">
          <button mat-raised-button color="primary" type="submit" [disabled]="bookForm.invalid">
            {{isEditing ? 'Update' : 'Create'}} Book
          </button>
          <button mat-button type="button" routerLink="/books" class="ms-2">
            Cancel
          </button>
        </div>
      </form>
    </div>
  `
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      isbn: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditing = true;
      this.bookService.getById(id).subscribe(book => {
        this.bookForm.patchValue(book);
      });
    }
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const book = this.bookForm.value;
      const operation = this.isEditing
        ? this.bookService.update(this.route.snapshot.params['id'], book)
        : this.bookService.create(book);

      operation.subscribe(() => {
        this.router.navigate(['/books']);
      });
    }
  }
}
