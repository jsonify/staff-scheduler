// app/types/index.ts

import { Models } from 'node-appwrite';
import { ParaEducator, Assignment } from './schema';

export type TimeSlot = {
  time: string;
  isAvailable: boolean;
};

export type Classroom = {
  id: string;
  name: string;
  timeSlots: TimeSlot[];
};

export type AssignmentWithDetails = Assignment & {
  paraEducatorName: string;
};

export type AppwriteUser = Models.User<Models.Preferences>;

export type Role = 'paraeducator' | 'admin' | 'owner';

export interface AuthState {
  user: AppwriteUser | null;
  roles: Role[];
  isLoading: boolean;
}

export type CalendarViewType = 'day' | 'week' | 'month';

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

export type { ParaEducator, Assignment } from './schema';