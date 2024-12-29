import type {} from "@mui/material/themeCssVarsAugmentation";

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Todo {
  id: number;
  title: string;
  description?: string;
  dueDate?: any;
  createdAt: Date;
  updatedAt: Date;
}

export type RegisterCredential = {
  name: string;
  email: string;
  password: string;
};

export type LoginCredential = {
  email: string;
  password: string;
};
