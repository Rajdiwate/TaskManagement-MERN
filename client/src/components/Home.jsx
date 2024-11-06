import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Task from './Task';
import { changeTaskStatus, getAllTasks } from '../api/task';

export default function Home() {
  const user = useSelector((state) => state.user);
  const [tasks, setTasks] = useState([]);
  const [sortBy, setSortBy] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');

  const [draggedTask, setDraggedTask] = useState(() => {
    const storedTask = localStorage.getItem('draggedTask');
    return storedTask ? JSON.parse(storedTask) : null;
  });
  
  const navigate = useNavigate();

  // Fetch tasks from the server
  const getTasks = async () => {
    const data = await getAllTasks()
    setTasks(data.tasks);
    
  };

  // Sort and filter tasks based on selected criteria and search query
  const getSortedAndFilteredTasks = (tasksToSort) => {
    // First filter tasks based on search query
    const filteredTasks = tasksToSort.filter((task) => {
      const searchString = searchQuery.toLowerCase();
      return (
        task.title.toLowerCase().includes(searchString) ||
        (task.description && task.description.toLowerCase().includes(searchString))
      );
    });

    // Then sort the filtered tasks
    return [...filteredTasks].sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'name':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  };

  // Handle sorting change
  const handleSortChange = (e) => {
    setSortBy(e.target.value.toLowerCase());
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle the start of a drag event
  const onDragStart = (e, task) => {
    setDraggedTask(task);
    localStorage.setItem('draggedTask', JSON.stringify(task));
  };

  // Handle dropping the task into a new status column
  const onDrop = async (e, newStatus) => {
    e.preventDefault();
    if (draggedTask) {
      try {
        // Update the status of the task locally
        const updatedTasks = tasks.map((task) => {
          if (task._id === draggedTask._id) {
            return { ...task, status: newStatus };
          }
          return task;
        });
        setTasks(updatedTasks);
  
        // Update the status in the database
        await changeStatus(draggedTask._id, newStatus);
  
        // Clear the dragged task
        setDraggedTask(null);
        localStorage.removeItem('draggedTask');
      } catch (error) {
        console.error('Error updating task status:', error);
      }
    }
  };

  // Update task status in the database
  const changeStatus = async (id, status) => {
    await changeTaskStatus({id ,status})
  };

  // Fetch tasks when the component mounts
  useEffect(() => {
    getTasks();
  }, [user, navigate]);

  // Get sorted and filtered tasks for each status column
  const getColumnTasks = (status) => {
    const filteredTasks = tasks.filter((task) => task.status === status);
    return getSortedAndFilteredTasks(filteredTasks);
  };

  return (
    <>
      {/* Main Content */}
      <main className="p-4">
        {/* Controls */}
        <div className="mb-4">
          <Link
            to="/add-task"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Add Task
          </Link>
        </div>

        {/* Search and Sort */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Search:</span>
            <input
              type="text"
              placeholder="Search by title or description..."
              className="border rounded px-3 py-1 w-full sm:w-64"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Sort By:</span>
            <select 
              className="border rounded px-3 py-1"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="recent">Recent</option>
              <option value="oldest">Oldest</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {/* Task Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* TODO Column */}
          <div
            onDrop={(e) => onDrop(e, 'TODO')}
            onDragOver={(e) => e.preventDefault()}
          >
            <h2 className="bg-blue-500 text-white px-4 py-2 rounded-t">TODO</h2>
            <div className="space-y-4 mt-4">
              {getColumnTasks('TODO').map((task) => (
                <Task key={task._id} task={task} onDragStart={onDragStart} getTasks={getTasks} />
              ))}
            </div>
          </div>

          {/* IN PROGRESS Column */}
          <div
            onDrop={(e) => onDrop(e, 'INPROGRESS')}
            onDragOver={(e) => e.preventDefault()}
          >
            <h2 className="bg-blue-500 text-white px-4 py-2 rounded-t">IN PROGRESS</h2>
            <div className="space-y-4 mt-4">
              {getColumnTasks('INPROGRESS').map((task) => (
                <Task key={task._id} task={task} onDragStart={onDragStart} getTasks={getTasks} />
              ))}
            </div>
          </div>

          {/* DONE Column */}
          <div
            onDrop={(e) => onDrop(e, 'DONE')}
            onDragOver={(e) => e.preventDefault()}
          >
            <h2 className="bg-blue-500 text-white px-4 py-2 rounded-t">DONE</h2>
            <div className="space-y-4 mt-4">
              {getColumnTasks('DONE').map((task) => (
                <Task key={task._id} task={task} onDragStart={onDragStart} getTasks={getTasks} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}