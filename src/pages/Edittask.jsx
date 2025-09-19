import TaskForm from "../components/Taskform";

function Edittask() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto mt-6 sm:mt-10 p-4 sm:p-6 lg:p-10 
                      bg-gradient-to-r from-blue-200 to-indigo-200 
                      shadow-lg rounded-lg">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center sm:text-left">
          Edit Task
        </h2>
        <TaskForm isEdit />
      </div>
    </div>
  );
}

export default Edittask;
