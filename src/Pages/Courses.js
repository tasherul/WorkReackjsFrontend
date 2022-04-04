import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { StateContext } from "../Components/StateContext";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [updateCourseName, setUpdateCourseName] = useState("");
  const [updateCourseDescription, setUpdateCourseDescription] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/courses", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, []);

  const deleteCourse = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/courses/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  const addCourse = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://127.0.0.1:8000/api/courses/`,
        {
          name: courseName,
          description: courseDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setCourses([...courses, res.data]);
        alert("Course added successfully");
        setCourseName("");
        setCourseDescription("");
      });
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Course</h1>
        <div>
          <button
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            Add Course
          </button>
          {/* Modal */}
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <div className="modal-body">
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Course Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter Course Name"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1">
                        Course Description
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Enter Course Description"
                        value={courseDescription}
                        onChange={(e) => setCourseDescription(e.target.value)}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={addCourse}
                  >
                    Add Course
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Course ID</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={index}>
                <th scope="row">{course.id}</th>
                <td>{course.name}</td>
                <td>{course.description.substring(0, 20)}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      deleteCourse(
                        course.id,
                        setCourses(courses.filter((c) => c.id !== course.id))
                      )
                    }
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary ml-2"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                  >
                    Edit
                  </button>
                  {/* Modal */}
                  <div
                    className="modal fade"
                    id="exampleModalCenter"
                    tabIndex={-1}
                    role="dialog"
                    aria-labelledby="exampleModalCenterTitle"
                    aria-hidden="true"
                  >
                    <div
                      className="modal-dialog modal-dialog-centered"
                      role="document"
                    >
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5
                            className="modal-title"
                            id="exampleModalLongTitle"
                          >
                            Update Course
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">×</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              Course Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              placeholder="Enter Course Name"
                              onChange={(e) =>
                                setUpdateCourseName(e.target.value)
                              }
                              value={updateCourseName}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">
                              Course Description
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="Enter Course Description"
                              onChange={(e) =>
                                setUpdateCourseDescription(e.target.value)
                              }
                              value={updateCourseDescription}
                            />
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={(e) => {
                              e.preventDefault();
                              axios
                                .put(
                                  `http://127.0.0.1:8000/api/courses/${course.id}`,
                                  {
                                    name: updateCourseName,
                                    description: updateCourseDescription,
                                  },
                                  {
                                    headers: {
                                      Authorization: `Bearer ${localStorage.getItem(
                                        "token"
                                      )}`,
                                    },
                                  }
                                )
                                .then((res) => {
                                  setCourses(
                                    courses.map((course) =>
                                      course.id === res.data.id
                                        ? res.data
                                        : course
                                    )
                                  );
                                  setUpdateCourseName("");
                                  setUpdateCourseDescription("");
                                });
                            }}
                          >
                            Save changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Courses;
