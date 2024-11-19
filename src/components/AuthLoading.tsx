"use client";

import { useEffect }from "react";
import { useAuth } from "@contexts/AuthContext";
import { User } from 'firebase/auth';

interface Props {
  children : React.ReactNode
  onUser : (user : User) => void
}

export default function AuthLoading({ children, onUser } : Props) {
  const { loading, user } = useAuth();
  
  useEffect(() => {
    if (!loading && user) {
      onUser(user)
    }
  }, [user, onUser, loading])
  

  return (
    <>
      {!loading && children}
    </>
  );
}
