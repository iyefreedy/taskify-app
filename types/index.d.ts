export interface User {
  id: string;
  name: string;
  email: string;
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
