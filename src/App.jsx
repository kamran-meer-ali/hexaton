import React, { useState } from "react";
import Navbar from "./components/Navbar";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleAdd = () => {
    if (!todo.trim()) return;

    if (editIndex !== null) {
      const updatedTodos = [...todos];
      updatedTodos[editIndex].todo = todo;
      setTodos(updatedTodos);
      setEditIndex(null);
      // alert("The null are not insert")
    } else {
      setTodos([...todos, { todo, isCompleted: false }]);
      alert("Thanks for adding a task")
    }

    setTodo("");
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  
  };

  const handleEdit = (index) => {
    setTodo(todos[index].todo);
    setEditIndex(index);
    alert("It's time of task change")

  };

  const handleDelete = (index) => {
    const filteredTodos = todos.filter((_, i) => i !== index);
    setTodos(filteredTodos);
  };

  const handleCancelEdit = () => {
    setTodo("");
    setEditIndex(null);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <div className="bg-violet-100 p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-violet-900 mb-4">Add a Task</h2>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              placeholder="Write your task here..."
              className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 text-black"
            />
            <button
              onClick={handleAdd}
              className="bg-violet-700 hover:bg-violet-800 text-white px-6 py-3 rounded-md transition cursor-pointer"
            >
              {editIndex !== null ? "Update" : "Add"}
            </button>
            {editIndex !== null && (
              <button
                onClick={handleCancelEdit}
                className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-md transition cursor-pointer"
              >
                Cancel
              </button>
            )}
          </div>

          <h2 className="text-xl font-semibold text-violet-900 mt-8">Your Todos</h2>

          <div className="mt-4 space-y-4">
            {todos.length === 0 ? (
              <p className="text-gray-600">No tasks added yet.</p>
            ) : (
              todos.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white p-4 rounded-md shadow border border-gray-200"
                >
                  <span
                    className={`text-lg ${
                      item.isCompleted ? "line-through text-gray-500" : "text-gray-800"
                    }`}
                  >
                    {item.todo}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-3 rounded-md text-md font-medium cursor-pointer"
                    >
                      Edit
                    </button>
                    {editIndex !== index && (
                      <button
                        onClick={() => handleDelete(index)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md text-sm font-medium cursor-pointer"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
