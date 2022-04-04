import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [videos, setVideos] = useState([]);

  useState(() => {
    localStorage.getItem("token") &&
      axios
        .get("http://127.0.0.1:8000/api/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setUser(res.data);
          setLoggedIn(true);
        })
        .catch((err) => {
          setError(err.response.data.message);
        });
  });

  const deleteStudent = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/students/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setStudents(students.filter((student) => student.id !== id));
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  //fetch student data if token is present
  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .get("http://127.0.0.1:8000/api/students", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setStudents(res.data);
        })
        .catch((err) => {
          setError(err.response.data.message);
        });
    }
  }, []);

  //fetch video data if token is present
  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .get("http://127.0.0.1:8000/api/videos", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setVideos(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    }
  }, []);

  const Register = (data) => {
    axios
      .post("http://127.0.0.1:8000/api/register", data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  const Login = (user) => {
    setLoading(true);
    setError(null);
    axios
      .post("http://127.0.0.1:8000/api/login", user)
      .then((res) => {
        setUser(res.data);
        setLoggedIn(true);
        setLoading(false);
        localStorage.setItem("token", res.data.token);
      })
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
      });
  };

  const Logout = () => {
    setLoggedIn(false);
    setUser({});
    localStorage.removeItem("token");
  };

  return (
    <StateContext.Provider
      value={{
        Login,
        loggedIn,
        Logout,
        Register,
        user,
        students,
        courses,
        videos,
        deleteStudent,
        setStudents,
        setVideos,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
