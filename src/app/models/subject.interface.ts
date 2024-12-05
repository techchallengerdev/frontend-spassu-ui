// src/app/shared/interfaces/subject.interface.ts
export interface BookSubject {
  // Renomeado de Subject para BookSubject
  id?: number;
  name: string;
  description: string;
  parentSubject?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
