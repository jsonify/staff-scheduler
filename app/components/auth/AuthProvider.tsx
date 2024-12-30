// app/components/auth/AuthProvider.tsx

"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import { ID, Account, Client } from 'node-appwrite';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: any | null;
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const session = await account.getSession('current');
      if (session) {
        const currentUser = await account.get();
        setUser(currentUser);
        // Check if user has admin role
        setIsAdmin(currentUser.labels?.includes('admin') || false);
      }
    } catch {
      setUser(null);
      setIsAdmin(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const session = await account.createEmailPasswordSession(email, password);
      if (session) {
        const currentUser = await account.get();
        setUser(currentUser);
        setIsAdmin(currentUser.labels?.includes('admin') || false);
        router.push('/admin');
      }
    } catch (e: any) {
      setError(e.message);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
      setIsAdmin(false);
      router.push('/');
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, isLoading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

