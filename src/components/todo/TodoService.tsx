/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

export type Itodo = {
  id: number;
  text: string;
  done: boolean;
  date: string;
};

let initialTodos: Itodo[] = [];

export const useTodo = () => {
  const [todoState, setTodoState] = useState(initialTodos);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [todoState]);

  const incrementNextId = () => {
    return Math.max(0, ...todoState.map((todo) => todo.id)) + 1;
  };

  const toggleTodo = (id: number) => {
    setTodoState((prevState) =>
      prevState.map((todo: Itodo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodoState((prevState) =>
      prevState.filter((todo: Itodo) => todo.id !== id)
    );
  };

  const createTodo = (todo: Itodo) => {
    setTodoState((prevState) => [...prevState, { ...todo }]);
  };

  const loadData = () => {
    let data = localStorage.getItem("todos");
    if (data === undefined) data = "";
    initialTodos = JSON.parse(data!);
    initialTodos ??= [];
    setTodoState(initialTodos);
  };

  const saveData = () => {
    localStorage.setItem("todos", JSON.stringify(todoState));
  };

  return {
    todoState,
    incrementNextId,
    toggleTodo,
    removeTodo,
    createTodo,
  };
};
