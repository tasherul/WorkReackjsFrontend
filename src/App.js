import "./App.css";
import Login from "./Pages/Login";
import { Routes, Route, Link } from "react-router-dom";
import Register from "./Pages/Register";
import React, { useEffect } from "react";
import { StateContext } from "./Components/StateContext";
import Home from "./Pages/Home";
import Courses from "./Pages/Courses";
import Video from "./Pages/Video";
import Student_course from "./Pages/Student_course";
import Information from "./Pages/Information";

function App() {
  const { loggedIn } = React.useContext(StateContext);

  return (
    <div className="App">
      {loggedIn ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="courses" element={<Courses />} />
          <Route path="video" element={<Video />} />
          <Route path="student_course" element={<Student_course />} />
          <Route path="information/:id" element={<Information />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="register" element={<Register />} />
          <Route path="/" element={<Login />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
