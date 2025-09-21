import TaskForm from "../components/Taskform";

function Createtask() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto mt-6 sm:mt-10 p-4 sm:p-6 lg:p-10 
                      bg-gradient-to-tr from-purple-300 to-pink-300 
                      rounded-lg shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center sm:text-left">
          Create Task
        </h2>
        <TaskForm />
      </div>
    </div>
  );
}

export default Createtask;
