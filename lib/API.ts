import { LoginCredential, RegisterCredential, Todo } from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API = {
  async register({ name, email, password }: RegisterCredential) {
    const response = await fetch(`${API_URL}/api/register`, {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json["error"]);
    }

    return json;
  },
  async login({ email, password }: LoginCredential) {
    const response = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json["error"]);
    }

    return json;
  },

  async authenticate(accessToken: string) {
    const response = await fetch(`${API_URL}/api/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json["error"]);
    }

    return json;
  },
  async createTodo(todo: Todo, accessToken: string) {
    const response = await fetch(`${API_URL}/api/todos`, {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json["error"]);
    }

    return json;
  },
};

export default API;
