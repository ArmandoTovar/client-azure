import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const API_URL = process.env.VITE_API_URL;

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch(`${API_URL}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      setTodos(data);
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: newTodo, completed: false }),
    });
    if (response.ok) {
      fetchTodos();
      setNewTodo("");
    }
  };

  const toggleComplete = async (id, completed) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ completed: !completed }),
    });
    if (response.ok) fetchTodos();
  };

  const deleteTodo = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) fetchTodos();
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Todo List
      </Typography>
      <TextField
        label="New Todo"
        fullWidth
        variant="outlined"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && addTodo()}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={addTodo}
        style={{ marginTop: 10 }}
      >
        Add Todo
      </Button>
      <List>
        {todos.map((todo) => (
          <ListItem key={todo.id}>
            <IconButton onClick={() => toggleComplete(todo.id, todo.completed)}>
              <CheckCircleIcon
                color={todo.completed ? "success" : "disabled"}
              />
            </IconButton>
            <ListItemText
              primary={todo.title}
              secondary={todo.completed ? "Completed" : "Pending"}
            />
            <IconButton onClick={() => deleteTodo(todo.id)}>
              <DeleteIcon color="error" />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default TodoApp;
