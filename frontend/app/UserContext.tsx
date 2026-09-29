'use client';

import {
  createContext,
  useContext,
  useState,
} from 'react';

export type User = {
  id: number;
  name: string;
  email: string;
};

export const UserContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<
    React.SetStateAction<User | null>
  >;
} | null>(null);

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser');
  }

  return context;
}