import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookService } from '../../../core/services/book.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiErrorResponse } from 'src/app/models/api-error-response';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatSelectModule,
    MatNativeDateModule,
  ],
  template: `
    <div class="container mt-4">
      <h1>{{ isEditing ? 'Edit' : 'Create' }} Book</h1>

      <form [formGroup]="bookForm" (ngSubmit)="onSubmit()" class="mt-4">
        <mat-form-field class="w-100 mb-3">
          <mat-label>Title</mat-label>
          <input matInput formControlName="titulo" placeholder="Book title" />
          <mat-error *ngIf="bookForm.get('titulo')?.errors?.['required']">
            Title is required
          </mat-error>
        </mat-form-field>

        <mat-form-field class="w-100 mb-3">
          <mat-label>Publisher</mat-label>
          <input
            matInput
            formControlName="editora"
            placeholder="Publisher name"
          />
        </mat-form-field>

        <mat-form-field class="w-100 mb-3">
          <mat-label>Edition</mat-label>
          <input
            matInput
            type="number"
            formControlName="edicao"
            placeholder="Edition number"
          />
        </mat-form-field>

        <mat-form-field class="w-100 mb-3">
          <mat-label>Publication Year</mat-label>
          <input
            matInput
            formControlName="anoPublicacao"
            placeholder="YYYY"
            maxlength="4"
          />
          <mat-error *ngIf="bookForm.get('anoPublicacao')?.errors?.['pattern']">
            Publication year must be 4 digits
          </mat-error>
        </mat-form-field>

        <mat-form-field class="w-100 mb-3">
          <mat-label>Authors</mat-label>
          <mat-select formControlName="autorCodAus" multiple>
            <mat-option [value]="1">Author 1</mat-option>
            <mat-option [value]="2">Author 2</mat-option>
          </mat-select>
          <mat-error *ngIf="bookForm.get('autorCodAus')?.errors?.['required']">
            At least one author is required
          </mat-error>
        </mat-form-field>

        <mat-form-field class="w-100 mb-3">
          <mat-label>Subjects</mat-label>
          <mat-select formControlName="assuntoCodAss" multiple>
            <mat-option [value]="1">Subject 1</mat-option>
            <mat-option [value]="2">Subject 2</mat-option>
          </mat-select>
          <mat-error
            *ngIf="bookForm.get('assuntoCodAss')?.errors?.['required']"
          >
            At least one subject is required
          </mat-error>
        </mat-form-field>

        <div class="mt-4">
          <button
            mat-raised-button
            color="primary"
            type="submit"
            [disabled]="bookForm.invalid || isSubmitting"
          >
            {{ isEditing ? 'Update' : 'Create' }} Book
          </button>
          <button
            mat-button
            type="button"
            [routerLink]="['/v1/livros']"
            class="ms-2"
          >
            Cancel
          </button>
        </div>
      </form>

      <div *ngIf="errorMessage" class="alert alert-danger mt-3">
        {{ errorMessage }}
      </div>
    </div>
  `,
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
  isEditing = false;
  isSubmitting = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.bookForm = this.fb.group({
      titulo: ['', [Validators.required]],
      editora: [''],
      edicao: [null],
      anoPublicacao: ['', [Validators.pattern(/^\d{4}$/)]],
      autorCodAus: [[], [Validators.required]],
      assuntoCodAss: [[], [Validators.required]],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditing = true;
      this.loadBook(id);
    }
  }

  private loadBook(id: number): void {
    this.bookService.getById(id).subscribe({
      next: (book) => {
        this.bookForm.patchValue(book);
      },
      error: (error: ApiErrorResponse) => {
        this.handleError(error);
      },
    });
  }

  onSubmit(): void {
    if (this.bookForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.errorMessage = null;

      const book = this.bookForm.value;
      const operation = this.isEditing
        ? this.bookService.update(this.route.snapshot.params['id'], book)
        : this.bookService.create(book);

      operation.subscribe({
        next: () => {
          const message = this.isEditing
            ? 'Book updated successfully'
            : 'Book created successfully';
          this.snackBar.open(message, 'Close', { duration: 3000 });
          this.router.navigate(['/v1/livros']);
        },
        error: (error: ApiErrorResponse) => {
          this.handleError(error);
          this.isSubmitting = false;
        },
        complete: () => {
          this.isSubmitting = false;
        },
      });
    } else {
      this.markFormAsTouched();
    }
  }

  private handleError(error: ApiErrorResponse): void {
    if (error.type === 'BusinessException') {
      this.errorMessage = error.message;
    } else {
      this.errorMessage = 'An unexpected error occurred. Please try again.';
    }

    // Mostra o erro também no snackbar para melhor visibilidade
    this.snackBar.open(this.errorMessage, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar'],
    });
  }

  private markFormAsTouched(): void {
    Object.keys(this.bookForm.controls).forEach((key) => {
      const control = this.bookForm.get(key);
      control?.markAsTouched();
    });
  }
}
