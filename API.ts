import { RegisterCredential } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default {
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
};
