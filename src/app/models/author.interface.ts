// src/app/shared/interfaces/author.interface.ts
export interface Author {
  id?: number;
  name: string;
  email: string;
  birthDate: Date;
  biography: string;
  books?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
