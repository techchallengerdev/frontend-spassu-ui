import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary">
      <span>Library Management</span>
      <span class="spacer"></span>
      <button mat-button routerLink="/livros">Livros</button>
      <button mat-button routerLink="/autores">Autores</button>
      <button mat-button routerLink="/assuntos">Assuntos</button>
    </mat-toolbar>
  `,
  styles: [
    `
      .spacer {
        flex: 1 1 auto;
      }
    `,
  ],
})
export class NavMenuComponent {}
