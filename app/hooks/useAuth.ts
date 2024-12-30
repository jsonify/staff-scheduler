// app/hooks/useAuth.ts

import React from 'react';
import { Account, Client } from 'node-appwrite';
import { AppwriteUser, AuthState, Role } from '@/app/types';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);

export function useAuth() {
  const [authState, setAuthState] = React.useState<AuthState>({
    user: null,
    roles: [],
    isLoading: true
  });

  React.useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await account.get() as AppwriteUser;
        const userRoles = (user.labels || []).filter((label): label is Role => 
          ['paraeducator', 'admin', 'owner'].includes(label)
        );
        
        setAuthState({
          user,
          roles: userRoles,
          isLoading: false
        });
      } catch {
        setAuthState({
          user: null,
          roles: [],
          isLoading: false
        });
      }
    };

    checkSession();
  }, []);

  return authState;
}