"use client";

import React from "react";
import { useAuth } from "@contexts/AuthContext";

export default function AuthLoading({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth();
  console.log('uh oh')
  return <>{!loading && children}</>;
}