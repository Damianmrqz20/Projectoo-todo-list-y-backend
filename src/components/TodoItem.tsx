import React from "react";
import { Todo } from "../types/Todo.tsx";

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  toggleTodo,
  deleteTodo,
}) => {
  return (
    <div
      style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        style={{ marginRight: "10px" }}
      />
      <span
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          marginRight: "auto",
        }}
      >
        {todo.text}
      </span>
      <button
        onClick={() => deleteTodo(todo.id)}
        style={{ marginLeft: "10px" }}
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
