import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TaskTable from "../components/Tasktable";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5; // Show 5 tasks per page

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  const handleDelete = (id) => {
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  // Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  return (
<div className="max-w-4xl mx-auto mt-10 p-6 bg-gradient-to-tr from-purple-300 to-pink-300 rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-800 text-center hover:-translate-y-1 cursor-pointer " >
        Task Manager
      </h1>

      <Link
        to="/create"
        className="inline-block mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 
             text-white px-6 py-2 rounded-lg shadow hover:from-blue-700 hover:to-indigo-700 
             transition-all hover:translate-x-1"
      >
        + Add Task
      </Link>


      <TaskTable tasks={currentTasks} handleDelete={handleDelete} />

    {/* Pagination Controls */}
{totalPages > 1 && (
  <div className="flex justify-center space-x-2 mt-6">
    <button
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
      className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-400 to-blue-500 
                 text-white disabled:opacity-50 disabled:cursor-not-allowed 
                 hover:from-red-500 hover:to-blue-600 transition-all transform hover:scale-105"
    >
      Prev
    </button>

    {[...Array(totalPages)].map((_, i) => (
      <button
        key={i}
        onClick={() => setCurrentPage(i + 1)}
        className={`px-4 py-2 rounded-lg transition-all transform hover:scale-105 ${
          currentPage === i + 1
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
            : "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 hover:from-gray-300 hover:to-gray-400"
        }`}
      >
        {i + 1}
      </button>
    ))}

    <button
      onClick={() =>
        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
      }
      disabled={currentPage === totalPages}
      className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-400 to-blue-500 
                 text-white disabled:opacity-50 disabled:cursor-not-allowed 
                 hover:from-red-500 hover:to-blue-600 transition-all transform hover:scale-105"
    >
      Next
    </button>
  </div>
)}
    </div>
  );
}

export default Home;
