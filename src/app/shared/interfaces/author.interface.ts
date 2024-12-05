export interface Author {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  biography: string;
  birthDate: Date;
  books?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
