import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Task({ task, onDragStart, onDrop, getTasks }) {
  const handleTaskDelete = async (id) => {
    await axios.delete(`http://localhost:8000/api/task/delete/${id}`, { withCredentials: true });
    await getTasks();
  };

  const trimDescription = (description, maxLength = 30) => {
    if (description.length <= maxLength) {
      return description;
    } else {
      return `${description.slice(0, maxLength)}...`;
    }
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task)}
      onDrop={(e) => onDrop(e, task)}
      onDragOver={(e) => e.preventDefault()}
      className="bg-blue-50 p-4 rounded cursor-pointer"
    >
      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-gray-600 text-sm">{trimDescription(task.description)}</p>
      <div className="mt-4">
        <p className="text-gray-500 text-sm">Created at: {task.createdAt}</p>
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={() => {
              handleTaskDelete(task._id);
            }}
            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
          >
            Delete
          </button>
          <Link to={`/edit/${task._id}`} className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
            Edit
          </Link>
          <Link to={`/details/${task._id}`} className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}