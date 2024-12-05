import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  template: `
    <mat-toolbar color="primary" class="header">
      <button mat-icon-button (click)="toggleSidenav.emit()">
        <mat-icon>menu</mat-icon>
      </button>

      <a mat-button routerLink="/" class="brand">
        <mat-icon>library_books</mat-icon>
        <span class="ms-2">Gestão de Livros</span>
      </a>

      <span class="spacer"></span>

      <div class="nav-items">
        <button mat-button [matMenuTriggerFor]="menu">
          <mat-icon>person</mat-icon>
          <span class="ms-1">Admin</span>
        </button>
        <mat-menu #menu="matMenu">
          <button mat-menu-item>
            <mat-icon>settings</mat-icon>
            <span>Settings</span>
          </button>
          <button mat-menu-item>
            <mat-icon>logout</mat-icon>
            <span>Logout</span>
          </button>
        </mat-menu>
      </div>
    </mat-toolbar>
  `,
  styles: [
    `
      .header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 2;
        height: 64px;
      }

      .brand {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: white;
        margin-left: 8px;
      }

      .spacer {
        flex: 1 1 auto;
      }

      .nav-items {
        display: flex;
        align-items: center;
        gap: 16px;
      }
    `,
  ],
})
export class HeaderComponent {
  @Output() toggleSidenav = new EventEmitter<void>();
}
