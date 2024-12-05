import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    HeaderComponent,
    FooterComponent,
  ],
  template: `
    <div class="main-container">
      <app-header></app-header>

      <mat-sidenav-container class="sidenav-container">
        <mat-sidenav mode="side" opened>
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
        </mat-sidenav>

        <mat-sidenav-content>
          <div class="content">
            <router-outlet></router-outlet>
          </div>
          <app-footer></app-footer>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [
    `
      .main-container {
        height: 100vh;
        display: flex;
        flex-direction: column;
      }

      .sidenav-container {
        flex: 1;
      }

      mat-sidenav {
        width: 250px;
        background-color: #f5f5f5;
      }

      .content {
        padding: 20px;
        min-height: calc(100vh - 64px - 64px);
      }

      .active {
        background-color: rgba(0, 0, 0, 0.1);
      }
    `,
  ],
})
export class ContainerComponent {}
