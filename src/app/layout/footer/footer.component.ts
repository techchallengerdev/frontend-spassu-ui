import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MatToolbarModule],
  template: `
    <mat-toolbar>
      <div class="footer-content">
        <span
          >&copy; {{ currentYear }} Sistema de Gestão de Livros. Todos os
          diretos reservados.</span
        >
      </div>
    </mat-toolbar>
  `,
  styles: [
    `
      mat-toolbar {
        height: 64px;
        background-color: #f5f5f5;
      }

      .footer-content {
        width: 100%;
        text-align: center;
        color: rgba(0, 0, 0, 0.87);
      }
    `,
  ],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
