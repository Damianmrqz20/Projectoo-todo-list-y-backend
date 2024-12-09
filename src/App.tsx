import React, { useState, useEffect, ChangeEvent } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "./api";
import { Todo } from './types/Todo';
import "./App.css"; // Importar los estilos externos

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (error) {
        console.error("Error al cargar las tareas:", error);
      }
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      const todo = await createTodo(newTodo);
      setTodos((prevTodos) => [...prevTodos, todo]);
      setNewTodo("");
    } catch (error) {
      console.error("Error al agregar la tarea:", error);
    }
  };

  const handleToggleComplete = async (id: number, completed: boolean) => {
    try {
      const updatedTodo = await updateTodo(id, !completed);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: updatedTodo.completed } : todo
        )
      );
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  return (
    <div className="app-container">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTodo}
          onChange={handleInputChange}
          placeholder="Nueva tarea"
        />
        <button onClick={handleAddTodo}>Agregar</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-item ${todo.completed ? "completed" : ""}`}
          >
            <span onClick={() => handleToggleComplete(todo.id, todo.completed)}>
              {todo.text}
            </span>
            <button onClick={() => handleDeleteTodo(todo.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
