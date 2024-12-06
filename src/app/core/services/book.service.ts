import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiErrorResponse } from 'src/app/models/api-error-response';
import { Book } from 'src/app/shared/interfaces/book.interface';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = `${environment.apiUrl}/v1/livros`;

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorResponse: ApiErrorResponse;

    if (error.error instanceof ErrorEvent) {
      errorResponse = {
        status: error.status,
        message: 'Erro de conexão. Verifique sua internet.',
        timestamp: new Date().toISOString(),
        type: 'ClientError',
      };
    } else {
      const apiError = error.error as ApiErrorResponse;
      if (apiError && apiError.type === 'BusinessException') {
        errorResponse = {
          status: error.status,
          message: apiError.message,
          timestamp: apiError.timestamp,
          type: apiError.type,
        };
      } else {
        errorResponse = {
          status: error.status,
          message: 'Ocorreu um erro inesperado. Tente novamente mais tarde.',
          timestamp: new Date().toISOString(),
          type: 'UnknownError',
        };
      }
    }

    return throwError(() => errorResponse);
  }

  getAll(): Observable<Book[]> {
    return this.http
      .get<Book[]>(this.apiUrl)
      .pipe(catchError((error) => this.handleError(error)));
  }

  getById(id: number): Observable<Book> {
    return this.http
      .get<Book>(`${this.apiUrl}/${id}`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  create(book: Book): Observable<Book> {
    return this.http
      .post<Book>(this.apiUrl, book)
      .pipe(catchError((error) => this.handleError(error)));
  }

  update(id: number, book: Book): Observable<Book> {
    return this.http
      .put<Book>(`${this.apiUrl}/${id}`, book)
      .pipe(catchError((error) => this.handleError(error)));
  }

  delete(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError((error) => this.handleError(error)));
  }
}
