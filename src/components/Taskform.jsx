import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import useForm from "../hooks/useForm";

function TaskForm({ isEdit }) {
    const navigate = useNavigate();
    const { id } = useParams();

    const { values, handleChange, resetForm, setValues } = useForm({
        title: "",
        description: "",
        status: "pending",
        dueDate: "",
    });

    useEffect(() => {
        if (isEdit) {
            const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
            const foundTask = savedTasks.find((t) => t.id === id);
            if (foundTask) setValues(foundTask);
        }
    }, [id, isEdit, setValues]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

        if (isEdit) {
            const updated = savedTasks.map((t) =>
                t.id === id ? { ...values, id } : t
            );
            localStorage.setItem("tasks", JSON.stringify(updated));
        } else {
            const newTask = { ...values, id: uuidv4() };
            localStorage.setItem("tasks", JSON.stringify([...savedTasks, newTask]));
            resetForm();
        }

        navigate("/");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                name="title"
                value={values.title}
                onChange={handleChange}
                placeholder="Task Title"
                className="w-full border px-4 py-2 rounded-lg shadow-sm focus:ring-2 
             focus:ring-blue-500 focus:outline-none"
                required
            />

            <textarea
                name="description"
                value={values.description}
                onChange={handleChange}
                placeholder="Task Description"
                className="w-full border px-3 py-2 rounded resize-none"
            />
            <select
                name="status"
                value={values.status}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
            >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
            </select>
            <input
                type="date"
                name="dueDate"
                value={values.dueDate}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
            />
            <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 
             text-white py-2 rounded-lg font-semibold shadow hover:from-blue-700 
             hover:to-indigo-700 transition-all text-xl"
            >
                {isEdit ? "Update Task" : "Create Task"}
            </button>

        </form>
    );
}

export default TaskForm;
