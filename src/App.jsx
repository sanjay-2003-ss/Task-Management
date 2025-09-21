import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Createtask from "./pages/Createtask";
import Edittask from "./pages/Edittask";
import TaskDetails from "./pages/TaskDetails";

function App() {
  return (
    <div className="h-screen bg-gradient-to-br from-blue-300 to-purple-400"> {/* 👈 change bg here */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Createtask />} />
          <Route path="/edit/:id" element={<Edittask />} />
          <Route path="/task/:id" element={<TaskDetails />} />
        </Routes>
      </Router>
    </div>
  );
}


export default App;

