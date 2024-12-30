// app/types/api.ts

import { ParaEducator, Assignment } from './schema';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface CreateAssignmentBody {
  paraEducatorId: string;
  time: string;
  classroom: string;
  date: string;
}

export interface UpdateAssignmentBody extends Partial<CreateAssignmentBody> {
  id: string;
}

export interface UpdateParaEducatorBody {
  id: string;
  timeBank?: number;
  status?: string;
}

export type AssignmentResponse = ApiResponse<Assignment>;
export type ParaEducatorResponse = ApiResponse<ParaEducator>;
export type AssignmentsListResponse = ApiResponse<Assignment[]>;
export type ParaEducatorsListResponse = ApiResponse<ParaEducator[]>;