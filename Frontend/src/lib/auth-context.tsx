'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type AuthUser = {
  id: string;
  email: string;
  name?: string;
};

interface AuthContextType {
  user: AuthUser | null;
  role: string | null;
  loading: boolean;
  token: string | null;
  login: (user: AuthUser, role: string, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true,
  token: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const stored = window.localStorage.getItem('auth');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as { user?: AuthUser; role?: string; token?: string };
        setUser(parsed.user ?? null);
        setRole(parsed.role ?? null);
        setToken(parsed.token ?? null);
      } catch {
        window.localStorage.removeItem('auth');
      }
    }

    setLoading(false);
  }, []);

  const login = (authUser: AuthUser, authRole: string, authToken: string) => {
    setUser(authUser);
    setRole(authRole);
    setToken(authToken);

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(
        'auth',
        JSON.stringify({ user: authUser, role: authRole, token: authToken }),
      );
    }
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    setToken(null);

    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('auth');
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, token, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
