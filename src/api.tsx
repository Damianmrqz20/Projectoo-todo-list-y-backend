
import axios from 'axios';

// Define the structure of a Todo item
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Create an Axios instance for the API
const api = axios.create({
  baseURL: 'http://localhost:5000', // Replace with your API base URL
});

// Fetch all todos
export const getTodos = async (): Promise<Todo[]> => {
  const response = await api.get<Todo[]>('/todos');
  return response.data;
};

// Create a new todo
export const createTodo = async (text: string): Promise<Todo> => {
  const response = await api.post<Todo>('/todos', { text });
  return response.data;
};

// Update a todo's completed status
export const updateTodo = async (id: number, completed: boolean): Promise<Todo> => {
  const response = await api.put<Todo>(`/todos/${id}`, { completed });
  return response.data;
};

// Delete a todo
export const deleteTodo = async (id: number): Promise<void> => {
  await api.delete(`/todos/${id}`);
};
