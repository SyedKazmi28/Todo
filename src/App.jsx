
import { useState } from "react";


function App() {
  const [input, setInput] = useState("");
  const [todo, setTodo] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input && input.trim()) {
      setTodo((prev) => [...prev, input]);
      setInput("");
    } else {
      alert("Please enter a task");
    }
  };

  const handleDelete = (i) => {
    let confirm = window.confirm(`Do you want to delete "${todo[i]}"?`);
    if (confirm) {
      const newArray = [...todo];
      newArray.splice(i, 1);
      setTodo(newArray);
    }
  };

  const handleDeleteAll = () => {
    setTodo([]);
  };

  const handleEdit = (value, i) => {
    setEditMode(true);
    const editTask = prompt("Enter a new task", value);
    const trimTask = editTask ? editTask.trim() : "";
    if (trimTask) {
      const newTodos = [...todo];
      newTodos[i] = trimTask;
      setTodo(newTodos);
    } else {
      alert("Please enter a valid task");
    }
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Add a Todo"
          value={input}
          onChange={handleInput}
        />
        <button type="submit">ADD</button>
      </form>
      {todo.length > 0 && (
        <button onClick={handleDeleteAll} className="delete">
          Delete All
        </button>
      )}
      <div className="todo-section">
        <ul>
          {todo.map((value, index) => (
            <li key={index} className="todo-item">
  <span className="todo-text" title={value}>{value}</span>
  <div className="todo-buttons">
    <button onClick={() => handleEdit(value, index)} className="edit">
      Edit
    </button>
    <button onClick={() => handleDelete(index)} className="delete">
      Delete
    </button>
  </div>
</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;