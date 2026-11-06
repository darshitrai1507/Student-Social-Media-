import React, { useState } from 'react';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { useAuth } from './AuthContext';

type AuthView = 'login' | 'signup';

export const AuthGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [view, setView] = useState<AuthView>('login');

  if (isAuthenticated) {
    return <>{children}</>;
  }

  if (view === 'signup') {
    return <SignupPage onGoToLogin={() => setView('login')} />;
  }

  return <LoginPage onGoToSignup={() => setView('signup')} />;
};
