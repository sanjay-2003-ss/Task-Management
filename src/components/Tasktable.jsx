import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

function TaskTable({ tasks, handleDelete }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Search + Filter + Sort
  const processedTasks = useMemo(() => {
    let result = [...tasks];

    // 🔍 Search by title
    if (searchQuery) {
      result = result.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 📝 Filter by status
    if (filterStatus !== "all") {
      result = result.filter((task) => task.status === filterStatus);
    }

    // ↕️ Sort
    result.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [tasks, searchQuery, filterStatus, sortKey, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(processedTasks.length / itemsPerPage);
  const paginatedTasks = processedTasks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Sorting handler
  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div className="mt-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded-lg px-3 py-2 w-full sm:w-1/3 focus:ring focus:ring-blue-300"
        />

        {/* Filter */}
        <select
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded-lg px-3 py-2"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg shadow text-sm sm:text-base">
          <thead className="bg-gradient-to-br from-blue-100 to-purple-300">
            <tr>
              <th
                className="px-3 sm:px-4 py-2 text-left cursor-pointer"
                onClick={() => handleSort("title")}
              >
                Title {sortKey === "title" ? (sortOrder === "asc" ? "⬆️" : "⬇️") : ""}
              </th>
              <th
                className="px-3 sm:px-4 py-2 text-left cursor-pointer"
                onClick={() => handleSort("status")}
              >
                Status {sortKey === "status" ? (sortOrder === "asc" ? "⬆️" : "⬇️") : ""}
              </th>
              <th
                className="px-3 sm:px-4 py-2 text-left cursor-pointer"
                onClick={() => handleSort("dueDate")}
              >
                Due Date {sortKey === "dueDate" ? (sortOrder === "asc" ? "⬆️" : "⬇️") : ""}
              </th>
              <th className="px-3 sm:px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTasks.length > 0 ? (
              paginatedTasks.map((task) => (
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
                  <td className="px-3 sm:px-4 py-2 flex gap-2 flex-col sm:flex-row">
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
              ))
            ) : (
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

    </div>
  );
}

export default TaskTable;
