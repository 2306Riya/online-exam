import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  signup: (name: string, email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

const STORAGE_USERS_KEY = 'examipro_users';
const STORAGE_SESSION_KEY = 'examipro_session';

// Pre-seeded demo account
const INITIAL_USERS = [
  {
    id: 'demo-user-1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    password: 'password123',
    createdAt: '2026-03-15T10:00:00Z',
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize accounts & session
  useEffect(() => {
    try {
      const storedUsers = localStorage.getItem(STORAGE_USERS_KEY);
      if (!storedUsers) {
        localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(INITIAL_USERS));
      }

      const activeSession = localStorage.getItem(STORAGE_SESSION_KEY);
      if (activeSession) {
        const user = JSON.parse(activeSession) as User;
        setCurrentUser(user);
      }
    } catch (e) {
      console.error('Failed to load auth session:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (email: string, password: string) => {
    try {
      const storedUsers = localStorage.getItem(STORAGE_USERS_KEY);
      const users = storedUsers ? JSON.parse(storedUsers) : INITIAL_USERS;

      const normalizedEmail = email.trim().toLowerCase();
      const existingUser = users.find(
        (u: any) => u.email.toLowerCase() === normalizedEmail
      );

      if (!existingUser) {
        return { success: false, error: 'No account found with this email address.' };
      }

      if (existingUser.password !== password) {
        return { success: false, error: 'Incorrect password. Please try again.' };
      }

      const userSession: User = {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        createdAt: existingUser.createdAt,
      };

      setCurrentUser(userSession);
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(userSession));
      return { success: true };
    } catch (err) {
      return { success: false, error: 'An unexpected error occurred during sign in.' };
    }
  };

  const signup = (name: string, email: string, password: string) => {
    try {
      const storedUsers = localStorage.getItem(STORAGE_USERS_KEY);
      const users = storedUsers ? JSON.parse(storedUsers) : INITIAL_USERS;

      const normalizedEmail = email.trim().toLowerCase();
      const emailExists = users.some(
        (u: any) => u.email.toLowerCase() === normalizedEmail
      );

      if (emailExists) {
        return { success: false, error: 'An account with this email already exists.' };
      }

      const newUser = {
        id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        name: name.trim(),
        email: normalizedEmail,
        password,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));

      return { success: true };
    } catch (err) {
      return { success: false, error: 'An error occurred while creating your account.' };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_SESSION_KEY);
  };

  return (
    <AuthContext.Provider value={{ currentUser, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
