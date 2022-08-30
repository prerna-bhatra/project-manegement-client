import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import ProjectList from "./containers/project/projectList";
import Login from "./login";
import NavBar from "./navbar";
import Project from "./containers/project/project";
import SiedBar from "./sidebar";
import Task from "./containers/task/task";
import AddProject from "./containers/project/addProject";
import AddTask from "./containers/task/addTask";

const App = () => {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <SiedBar />
        {/* <h1>Hornblower Project Managements </h1> */}
        <div className="main-body">
          <Routes>
            <Route exact path="/" element={<ProjectList />} />
            <Route exact path="/login"  element={<Login />} />
            <Route exact path="/project" element={<Project />} />
            <Route exact path="/task" element={<Task />} />
            <Route exact path="/add-project" element={<AddProject />} />
            <Route exact path="/add-task" element={<AddTask />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
