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
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SubjectService } from '../../../core/services/subject.service';
import { Subject } from 'src/app/shared/interfaces/subject.interface';

@Component({
  selector: 'app-subject-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  template: `
    <div class="container mt-4">
      <h1>{{ isEditing ? 'Edit' : 'Create' }} Subject</h1>

      <form [formGroup]="subjectForm" (ngSubmit)="onSubmit()" class="mt-4">
        <mat-form-field class="w-100 mb-3">
          <mat-label>Name</mat-label>
          <input matInput formControlName="name" placeholder="Subject name" />
          <mat-error *ngIf="subjectForm.get('name')?.hasError('required')">
            Name is required
          </mat-error>
        </mat-form-field>

        <mat-form-field class="w-100 mb-3">
          <mat-label>Description</mat-label>
          <textarea
            matInput
            formControlName="description"
            placeholder="Subject description"
            rows="4"
          ></textarea>
          <mat-error
            *ngIf="subjectForm.get('description')?.hasError('required')"
          >
            Description is required
          </mat-error>
        </mat-form-field>

        <mat-form-field class="w-100 mb-3">
          <mat-label>Parent Subject</mat-label>
          <mat-select formControlName="parentSubject">
            <mat-option>None</mat-option>
            <mat-option
              *ngFor="let subject of parentSubjects"
              [value]="subject.id"
            >
              {{ subject.name }}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <div class="d-flex gap-2 mt-4">
          <button
            mat-raised-button
            color="primary"
            type="submit"
            [disabled]="subjectForm.invalid || isSubmitting"
          >
            {{ isEditing ? 'Update' : 'Create' }} Subject
          </button>
          <button mat-button type="button" routerLink="/v1/assuntos">
            Cancel
          </button>
        </div>
      </form>
    </div>
  `,
})
export class SubjectFormComponent implements OnInit {
  subjectForm: FormGroup;
  isEditing = false;
  isSubmitting = false;
  parentSubjects: Subject[] = [];

  constructor(
    private fb: FormBuilder,
    private subjectService: SubjectService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.subjectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      parentSubject: [null],
    });
  }

  ngOnInit(): void {
    this.loadParentSubjects();

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditing = true;
      this.subjectService.getById(id).subscribe({
        next: (subject) => this.subjectForm.patchValue(subject),
        error: (error) => console.error('Error loading subject:', error),
      });
    }
  }

  loadParentSubjects(): void {
    this.subjectService.getAll().subscribe({
      next: (subjects) => {
        const currentId = this.route.snapshot.params['id'];
        this.parentSubjects = subjects.filter((s) => s.id !== currentId);
      },
      error: (error) => console.error('Error loading parent subjects:', error),
    });
  }

  onSubmit(): void {
    if (this.subjectForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      const subject = this.subjectForm.value;

      const operation = this.isEditing
        ? this.subjectService.update(this.route.snapshot.params['id'], subject)
        : this.subjectService.create(subject);

      operation.subscribe({
        next: () => {
          this.router.navigate(['/v1/assuntos']);
        },
        error: (error) => {
          console.error('Error saving subject:', error);
          this.isSubmitting = false;
        },
      });
    }
  }
}
