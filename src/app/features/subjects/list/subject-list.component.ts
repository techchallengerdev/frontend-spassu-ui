import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SubjectService } from '../../../core/services/subject.service';
import { Subject } from '../../../shared/interfaces/subject.interface';

@Component({
  selector: 'app-subject-list',
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
        <h1>Subjects</h1>
        <button mat-raised-button color="primary" routerLink="new">
          Add New Subject
        </button>
      </div>

      <mat-table [dataSource]="subjects" class="mat-elevation-z8">
        <ng-container matColumnDef="name">
          <mat-header-cell *matHeaderCellDef>Name</mat-header-cell>
          <mat-cell *matCellDef="let subject">{{subject.name}}</mat-cell>
        </ng-container>

        <ng-container matColumnDef="description">
          <mat-header-cell *matHeaderCellDef>Description</mat-header-cell>
          <mat-cell *matCellDef="let subject">{{subject.description}}</mat-cell>
        </ng-container>

        <ng-container matColumnDef="parentSubject">
          <mat-header-cell *matHeaderCellDef>Parent Subject</mat-header-cell>
          <mat-cell *matCellDef="let subject">{{subject.parentSubject}}</mat-cell>
        </ng-container>

        <ng-container matColumnDef="actions">
          <mat-header-cell *matHeaderCellDef>Actions</mat-header-cell>
          <mat-cell *matCellDef="let subject">
            <button mat-icon-button color="primary" [routerLink]="[subject.id]">
              <mat-icon>visibility</mat-icon>
            </button>
            <button mat-icon-button color="accent" [routerLink]="[subject.id, 'edit']">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button color="warn" (click)="deleteSubject(subject.id)">
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
export class SubjectListComponent implements OnInit {
  subjects: Subject[] = [];
  displayedColumns: string[] = ['name', 'description', 'parentSubject', 'actions'];

  constructor(private subjectService: SubjectService) {}

  ngOnInit(): void {
    this.loadSubjects();
  }

  loadSubjects(): void {
    this.subjectService.getAll().subscribe({
      next: (data) => this.subjects = data,
      error: (error) => console.error('Error loading subjects:', error)
    });
  }

  deleteSubject(id: number): void {
    if (confirm('Are you sure you want to delete this subject?')) {
      this.subjectService.delete(id).subscribe({
        next: () => this.loadSubjects(),
        error: (error) => console.error('Error deleting subject:', error)
      });
    }
  }
}
