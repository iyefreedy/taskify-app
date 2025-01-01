import { useEffect, useState } from "react";
import { Todo } from "../types";
import { useLocalStorage } from "./useLocalStorage";
import API from "../API";

export const useFetchTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const { value: accessToken } = useLocalStorage("accessToken", null);

  useEffect(() => {
    const fetchTodos = async () => {
      if (!accessToken) return;
      setLoading(true);
      try {
        const todos = await API.getTodos(accessToken);
        setTodos(todos);
      } catch (error: unknown) {
        console.log(error);
        setTodos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [accessToken]);

  const addTodo = async (todo: Todo) => {
    if (!accessToken) return;
    setLoading(true);
    try {
      const newTodo = await API.createTodo(todo, accessToken);
      setTodos([...todos, newTodo]);
    } catch (error: unknown) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { todos, loading, addTodo };
};
