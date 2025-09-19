import { Link } from "react-router-dom";

function TaskTable({ tasks, handleDelete }) {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full border border-gray-300 rounded-lg shadow text-sm sm:text-base">
        <thead className="bg-gradient-to-br from-blue-100 to-purple-300">
          <tr>
            <th className="px-3 sm:px-4 py-2 text-left cursor-pointer">Title</th>
            <th className="px-3 sm:px-4 py-2 text-left cursor-pointer">Status</th>
            <th className="px-3 sm:px-4 py-2 text-left cursor-pointer">Due Date</th>
            <th className="px-3 sm:px-4 py-2 text-left cursor-pointer">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr
              key={task.id}
              className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition"
            >
              {/* Title */}
              <td className="px-3 sm:px-4 py-2 font-medium text-gray-700">
                <Link
                  to={`/task/${task.id}`}
                  className="text-blue-600 hover:underline break-words"
                >
                  {task.title}
                </Link>
              </td>

              {/* Status */}
              <td className="px-3 sm:px-4 py-2">
                <span
                  className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                    task.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {task.status}
                </span>
              </td>

              {/* Due Date */}
              <td className="px-3 sm:px-4 py-2 text-gray-600 whitespace-nowrap">
                {task.dueDate}
              </td>

              {/* Actions */}
              <td className="px-3 sm:px-4 py-2 space-y-2 sm:space-y-0 sm:space-x-2 flex flex-col sm:flex-row">
                <Link
                  to={`/edit/${task.id}`}
                  className="bg-blue-500 text-white px-3 py-1 rounded shadow hover:bg-blue-600 text-center"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded shadow hover:bg-red-600 text-center"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {tasks.length === 0 && (
            <tr>
              <td
                colSpan="4"
                className="text-center py-4 text-gray-500 text-sm sm:text-base"
              >
                No tasks found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TaskTable;
