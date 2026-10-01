'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { me } from '@/lib/auth';

export type User = {
  id: number;
  name: string;
  email: string;
};

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<
    React.SetStateAction<User | null>
  >;
  loading: boolean;
};

export const UserContext =
  createContext<UserContextType | null>(null);

export function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    let active = true;
    const checkAuth = async () => {
      try {
        const response = await me();

        if (!active) {
          return;
        }

        if (!response.ok) {
          setUser(null);
          return;
        }

        const data = await response.json();

        setUser(data.user ?? null);
      } catch (error) {
        if (!active) {
          return;
        }

        console.error(
          '認証確認失敗',
          error
        );

        setUser(null);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    checkAuth();

    return () => {
      active = false;
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (context === null) {
    throw new Error(
      'useUserはUserProvider内で使用してください。'
    );
  }

  return context;
}