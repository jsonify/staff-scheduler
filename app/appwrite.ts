// app/lib/appwrite.ts

import { Client, Account, Databases } from 'appwrite';
import { ParaEducator, Assignment, Classroom } from '@/app/types';

// Client-side config
const createClient = () => {
 const client = new Client();
 client
   .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
   .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);
 return client;
};

// Server-side config  
const createServerClient = () => {
 const client = new Client();
 client
   .setEndpoint(process.env.APPWRITE_ENDPOINT!)
   .setProject(process.env.APPWRITE_PROJECT_ID!)
   .setKey(process.env.APPWRITE_API_KEY!);
 return client;
};

export const client = createClient();
export const serverClient = createServerClient();

export const account = new Account(client);
export const databases = new Databases(client);
export const serverDatabases = new Databases(serverClient);

export const COLLECTION_IDS = {
   paraEducators: 'paraEducators',
   assignments: 'assignments', 
   classrooms: 'classrooms'
} as const;

export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;

// Client-side queries
export const clientQueries = {
   getParaEducators: async (): Promise<ParaEducator[]> => {
       const response = await databases.listDocuments(
           DATABASE_ID,
           COLLECTION_IDS.paraEducators
       );
       return response.documents as ParaEducator[];
   }
};

// Server-side queries
export const serverQueries = {
   createAssignment: async (assignment: Omit<Assignment, 'id'>): Promise<Assignment> => {
       const response = await serverDatabases.createDocument(
           DATABASE_ID,
           COLLECTION_IDS.assignments,
           'unique()',
           assignment
       );
       return response as Assignment;
   }
};