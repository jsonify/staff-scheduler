// app/types/schema.ts
export interface ParaEducator {
  $id: string;
  name: string;
  timeBank: number;
  email?: string;
  status?: string;
}

export interface Assignment {
  $id: string;
  paraEducator: string;
  time: string;
  classroom: string;
  createdBy: string;
  date: string;
}

export enum CollectionName {
  ParaEducators = 'paraeducators',
  Assignments = 'assignments'
}