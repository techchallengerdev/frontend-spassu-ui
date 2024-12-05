export interface Book {
  id?: number;
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  genre: string;
  description: string;
  available: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
