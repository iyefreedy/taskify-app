"use client";

import { LoginCredential, RegisterCredential, User } from "@/lib/types";
import React, { createContext, useEffect, useState } from "react";
import API from "@/lib/API";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface AuthContextProps {
  accessToken: string | null;
  user?: User;
  loading: boolean;
  error?: string;
  handleRegister: ({
    name,
    email,
    password,
  }: RegisterCredential) => Promise<void>;
  handleLogin: ({ email, password }: LoginCredential) => Promise<void>;
  handleLogout: () => void;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { value: accessToken, setValue: setAccessToken } = useLocalStorage(
    "accessToken",
    null
  );
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const authenticate = async () => {
      if (accessToken == null) {
        setUser(undefined);
        setError(undefined);
        return;
      }

      try {
        setLoading(true);
        const user = await API.authenticate(accessToken);

        setUser(user);
      } catch (error) {
        setUser(undefined);
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occured";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    authenticate();
  }, [accessToken]);

  const handleRegister = async ({
    name,
    email,
    password,
  }: RegisterCredential) => {
    try {
      setLoading(true);
      const response = await API.register({ name, email, password });

      setAccessToken(response.accessToken);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occured";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async ({ email, password }: LoginCredential) => {
    try {
      setLoading(true);
      const response = await API.login({ email, password });

      setAccessToken(response.accessToken);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occured";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setAccessToken(null);
    setUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        accessToken,
        handleRegister,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
