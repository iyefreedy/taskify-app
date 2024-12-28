"use client";

import { User } from "@/types";
import React, { createContext, useState } from "react";
import API from "../API";

interface AuthContextProps {
  user?: User;

  handleRegister: ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  handleRegister: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>();

  const handleRegister = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    await API.register({ name, email, password });
  };

  return (
    <AuthContext.Provider value={{ user, handleRegister }}>
      {children}
    </AuthContext.Provider>
  );
};
