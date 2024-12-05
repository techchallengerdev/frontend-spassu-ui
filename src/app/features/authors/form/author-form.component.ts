import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthorService } from '../../../core/services/author.service';

@Component({
  selector: 'app-author-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  template: `
    <div class="container mt-4">
      <h1>{{isEditing ? 'Edit' : 'Create'}} Author</h1>
      
      <form [formGroup]="authorForm" (ngSubmit)="onSubmit()" class="mt-4">
        <mat-form-field class="w-100 mb-3">
          <mat-label>First Name</mat-label>
          <input matInput formControlName="firstName" placeholder="First name">
          <mat-error *ngIf="authorForm.get('firstName')?.hasError('required')">
            First name is required
          </mat-error>
        </mat-form-field>

        <mat-form-field class="w-100 mb-3">
          <mat-label>Last Name</mat-label>
          <input matInput formControlName="lastName" placeholder="Last name">
          <mat-error *ngIf="authorForm.get('lastName')?.hasError('required')">
            Last name is required
          </mat-error>
        </mat-form-field>

        <mat-form-field class="w-100 mb-3">
          <mat-label>Email</mat-label>
          <input matInput formControlName="email" type="email" placeholder="Email">
          <mat-error *ngIf="authorForm.get('email')?.hasError('required')">
            Email is required
          </mat-error>
          <mat-error *ngIf="authorForm.get('email')?.hasError('email')">
            Please enter a valid email address
          </mat-error>
        </mat-form-field>

        <mat-form-field class="w-100 mb-3">
          <mat-label>Birth Date</mat-label>
          <input matInput [matDatepicker]="picker" formControlName="birthDate">
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
          <mat-error *ngIf="authorForm.get('birthDate')?.hasError('required')">
            Birth date is required
          </mat-error>
        </mat-form-field>

        <mat-form-field class="w-100 mb-3">
          <mat-label>Biography</mat-label>
          <textarea matInput formControlName="biography" placeholder="Author biography" rows="4"></textarea>
        </mat-form-field>

        <div class="d-flex gap-2 mt-4">
          <button mat-raised-button color="primary" type="submit" [disabled]="authorForm.invalid || isSubmitting">
            {{isEditing ? 'Update' : 'Create'}} Author
          </button>
          <button mat-button type="button" routerLink="/authors">Cancel</button>
        </div>
      </form>
    </div>
  `
})
export class AuthorFormComponent implements OnInit {
  authorForm: FormGroup;
  isEditing = false;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authorService: AuthorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.authorForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', Validators.required],
      biography: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditing = true;
      this.authorService.getById(id).subscribe({
        next: (author) => this.authorForm.patchValue(author),
        error: (error) => console.error('Error loading author:', error)
      });
    }
  }

  onSubmit(): void {
    if (this.authorForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      const author = this.authorForm.value;

      const operation = this.isEditing
        ? this.authorService.update(this.route.snapshot.params['id'], author)
        : this.authorService.create(author);

      operation.subscribe({
        next: () => {
          this.router.navigate(['/authors']);
        },
        error: (error) => {
          console.error('Error saving author:', error);
          this.isSubmitting = false;
        }
      });
    }
  }
}
