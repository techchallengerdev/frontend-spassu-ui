// src/app/shared/interfaces/book.interface.ts
export interface Book {
  id?: number;
  title: string;
  isbn: string;
  authorId: number;
  subjectId: number;
  publishedYear: number;
  description: string;
  available: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
