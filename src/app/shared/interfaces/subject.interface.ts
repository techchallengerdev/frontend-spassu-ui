export interface Subject {
  id?: number;
  name: string;
  description: string;
  parentSubject?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
