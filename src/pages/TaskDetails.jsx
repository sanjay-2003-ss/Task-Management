import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const foundTask = savedTasks.find((t) => t.id === id);
    setTask(foundTask);
  }, [id]);

  if (!task) {
    return (
      <p className="text-center mt-10 text-gray-500 text-sm sm:text-base">
        Task not found.
      </p>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto mt-6 sm:mt-10 p-6 sm:p-8 
                      bg-gradient-to-r from-blue-100 to-indigo-100 
                      shadow-lg rounded-lg">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 text-center sm:text-left">
          {task.title}
        </h2>

        <p className="mb-2 text-gray-700">
          <strong>Description:</strong> {task.description}
        </p>

        <p className="mb-2">
          <strong>Status:</strong>{" "}
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              task.status === "completed"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {task.status}
          </span>
        </p>

        <p className="mb-4 text-gray-700">
          <strong>Due Date:</strong> {task.dueDate}
        </p>

        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          >
            Back
          </button>
          <Link
            to={`/edit/${task.id}`}
            className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-center"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;
