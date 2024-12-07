import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Topbar from "./components/Topbar/Topbar";
import Test from "./components/Test";
import LoginPage from "./components/Login/Login";
import TaskList from "./components/Project/Project"; 
import TaskBoard from "./components/Project/Project";
import ProjectManager from "./components/Project/Project";
import TaskManagementForm from "./components/Task/Task";

function App() {
  return (
    <Router>
      <Topbar />
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/user" element={<Test />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/project" element={<ProjectManager />} />
        <Route path="/task" element={<TaskManagementForm />} />
        {/* <Route path="/task" element={<TaskBoard  />} />  */}
      </Routes>
    </Router>
  );
}

export default App;
