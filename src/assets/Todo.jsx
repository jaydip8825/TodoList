import React, { useEffect, useState } from "react";
import "./Todo.css";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editID, setEditID] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim() === "") return;
    setTodos([...todos, { text: input, id: Date.now() }]);
    setInput("");
  };

  const deleteTodo = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure this todo are Deleted....."
    );
    if (!isConfirmed) return;
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEdit = (id, currentText) => {
    setEditID(id);
    setEditText(currentText);
  };

  const saveEdit = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure this msg is saved for Edite"
    );
    if (!isConfirmed) return;

    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: editText } : todo))
    );
    setEditID(null);
    setEditText("");
  };

  const clearAllTodos = () => {
    const isConfirmed = window.confirm(
      "Are you sure you are all data are deleted.....?"
    );
    if (!isConfirmed) return;
    setTodos([]);
  };

  return (
    <div className="todo-container">
      <h2>This is Todo list</h2>
      <div className="todo-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a todo"
          autoFocus
        />
        <button onClick={addTodo}>Add</button>
        <button className="clear-all" onClick={clearAllTodos}>
          Clear All
        </button>
      </div>

      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id}>
            {editID === todo.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <div className="btn-group">
                  <button onClick={() => saveEdit(todo.id)}>Save</button>
                </div>
              </>
            ) : (
              <>
                <span className="todo-text">
                  <span className="todo-number">{index + 1}</span>
                  {todo.text}
                </span>
                <div className="btn-group">
                  <button
                    className="edit"
                    onClick={() => startEdit(todo.id, todo.text)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                  
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
