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
