import { useEffect, useState } from "react";
import { Todo } from "../types";
import { useLocalStorage } from "./useLocalStorage";
import API from "../API";

export const useFetchTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { value: accessToken } = useLocalStorage("accessToken", null);

  useEffect(() => {
    const fetchTodos = async () => {
      if (!accessToken) return;
      try {
        const todos = await API.getTodos(accessToken);
        setTodos(todos);
      } catch (error: unknown) {
        console.log(error);
        setTodos([]);
      }
    };

    fetchTodos();
  }, [accessToken]);

  return { todos };
};
