"use client";
import { useAuth } from '@contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/user/login');
    }
  }, [user, loading, router]);

  if (loading) {
    // later can render a loading spinner here if you guys wanna have one
    return <div>Loading...</div>;
  }

  if (!user) {
    // return null if the user is being redirected
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
