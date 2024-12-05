import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
  ],
  template: `
    <mat-nav-list>
      <a mat-list-item routerLink="/books" routerLinkActive="active">
        <mat-icon matListItemIcon>menu_book</mat-icon>
        <span matListItemTitle>Books</span>
      </a>

      <a mat-list-item routerLink="/authors" routerLinkActive="active">
        <mat-icon matListItemIcon>person</mat-icon>
        <span matListItemTitle>Authors</span>
      </a>

      <a mat-list-item routerLink="/subjects" routerLinkActive="active">
        <mat-icon matListItemIcon>category</mat-icon>
        <span matListItemTitle>Subjects</span>
      </a>
    </mat-nav-list>
  `,
  styles: [
    `
      .active {
        background: rgba(0, 0, 0, 0.04);
      }

      mat-nav-list {
        padding-top: 0;
      }
    `,
  ],
})
export class SidenavComponent {}
