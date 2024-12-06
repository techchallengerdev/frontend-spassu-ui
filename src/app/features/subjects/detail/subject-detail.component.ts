import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SubjectService } from '../../../core/services/subject.service';
import { Subject } from 'src/app/shared/interfaces/subject.interface';

@Component({
  selector: 'app-subject-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  template: `
    <div class="container mt-4">
      <mat-card *ngIf="subject">
        <mat-card-header>
          <mat-card-title>{{ subject.name }}</mat-card-title>
          <mat-card-subtitle *ngIf="subject.parentSubject"
            >Parent: {{ subject.parentSubject }}</mat-card-subtitle
          >
        </mat-card-header>
        <mat-card-content>
          <p><strong>Description:</strong></p>
          <p>{{ subject.description }}</p>
        </mat-card-content>
        <mat-card-actions>
          <button
            mat-button
            [routerLink]="['/v1/assuntos', subject.id, 'edit']"
          >
            EDIT
          </button>
          <button mat-button routerLink="/v1/assuntos">BACK</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
})
export class SubjectDetailComponent implements OnInit {
  subject?: Subject;

  constructor(
    private subjectService: SubjectService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.subjectService.getById(id).subscribe({
        next: (subject) => (this.subject = subject),
        error: (error) => console.error('Error loading subject:', error),
      });
    }
  }
}
