// app/types/schema.ts

export interface ParaEducator {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    name: string;
    timeBank: number;
    email?: string;
    status?: string;
  }
  
  export interface Assignment {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    paraEducator: string;
    time: string;
    classroom: string;
    createdBy: string;
    date?: string;
  }
  
  export interface DatabaseCollections {
    paraeducators: ParaEducator;
    assignments: Assignment;
  }
  
  export type CollectionName = keyof DatabaseCollections;