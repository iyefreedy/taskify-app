"use client";

import { LoginCredential, RegisterCredential, User } from "@/lib/types";
import React, { createContext, useEffect, useState } from "react";
import API from "../../API";

interface AuthContextProps {
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

export const AuthContext = createContext<AuthContextProps>({
  loading: false,
  handleRegister: async () => {},
  handleLogin: async () => {},
  handleLogout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState(() =>
    typeof window !== "undefined"
      ? window.localStorage.getItem("accessToken")
      : null
  );
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const authenticate = async () => {
      if (accessToken == null) {
        setUser(undefined);
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
      if (typeof window !== "undefined") {
        window.localStorage.setItem("accessToken", response.accessToken);
      }
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
      if (typeof window !== "undefined") {
        window.localStorage.setItem("accessToken", response.accessToken);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occured";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("accessToken");
    }

    setAccessToken(null);
    setUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        handleRegister,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
