import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'v1/livros',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/books/list/book-list.component').then(
            (m) => m.BookListComponent
          ),
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./features/books/form/book-form.component').then(
            (m) => m.BookFormComponent
          ),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./features/books/detail/book-detail.component').then(
            (m) => m.BookDetailComponent
          ),
      },
      {
        path: ':id/edit',
        loadComponent: () =>
          import('./features/books/form/book-form.component').then(
            (m) => m.BookFormComponent
          ),
      },
    ],
  },
  {
    path: 'v1/autores',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/authors/list/author-list.component').then(
            (m) => m.AuthorListComponent
          ),
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./features/authors/form/author-form.component').then(
            (m) => m.AuthorFormComponent
          ),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./features/authors/detail/author-detail.component').then(
            (m) => m.AuthorDetailComponent
          ),
      },
      {
        path: ':id/edit',
        loadComponent: () =>
          import('./features/authors/form/author-form.component').then(
            (m) => m.AuthorFormComponent
          ),
      },
    ],
  },
  { path: '', redirectTo: 'v1/livros', pathMatch: 'full' },
  {
    path: 'v1/assuntos',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/subjects/list/subject-list.component').then(
            (m) => m.SubjectListComponent
          ),
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./features/subjects/form/subject-form.component').then(
            (m) => m.SubjectFormComponent
          ),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./features/subjects/detail/subject-detail.component').then(
            (m) => m.SubjectDetailComponent
          ),
      },
      {
        path: ':id/edit',
        loadComponent: () =>
          import('./features/subjects/form/subject-form.component').then(
            (m) => m.SubjectFormComponent
          ),
      },
    ],
  },
  { path: '', redirectTo: 'v1/livros', pathMatch: 'full' },
];
