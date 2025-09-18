import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  fullName: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (fullName: string, email: string, password: string) => Promise<boolean>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing authentication on app load
  useEffect(() => {
    const checkAuth = () => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          console.error('Error parsing saved user:', error);
          localStorage.removeItem('user');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call - replace with actual authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any email/password combination
      // In real app, validate against your backend
      const userData: User = {
        id: '1',
        email: email,
        fullName: email.split('@')[0] // Use email prefix as name for demo
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Sign in error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const signUp = async (fullName: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call - replace with actual registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, create user immediately
      // In real app, validate and create user on backend
      const userData: User = {
        id: Date.now().toString(),
        email: email,
        fullName: fullName
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Sign up error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    signIn,
    signUp,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
