import { useEffect, useMemo, useState } from "react";
import { Todo } from "../types";
import { useLocalStorage } from "./useLocalStorage";
import API from "../API";

export const useFetchTodos = () => {
  const [state, setState] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const { value: accessToken } = useLocalStorage("accessToken", null);

  const todos = useMemo(() => {
    return state.filter((value) => !value.done);
  }, [state]);

  useEffect(() => {
    const fetchTodos = async () => {
      if (!accessToken) return;
      setLoading(true);
      try {
        const todos = await API.getTodos(accessToken);
        setState(todos);
      } catch (error: unknown) {
        console.log(error);
        setState([]);
        setError(
          error instanceof Error ? error.message : "An unknown error occured"
        );
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
      setState([...todos, newTodo]);
    } catch (error: unknown) {
      console.log(error);
      setError(
        error instanceof Error ? error.message : "An unknown error occured"
      );
    } finally {
      setLoading(false);
    }
  };

  const updateTodo = async (todo: Todo) => {
    if (!accessToken) return;
    setLoading(true);

    try {
      const updatedTodo = await API.updateTodo(todo, accessToken);
      setState((prevTodos) => {
        const filteredTodos = prevTodos.filter(
          (value) => value.id !== updatedTodo.id
        );
        return [...filteredTodos, updatedTodo];
      });
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occured"
      );
    } finally {
      setLoading(false);
    }
  };

  return { todos, loading, error, addTodo, updateTodo };
};
