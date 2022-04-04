import axios from "axios";
import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";

const Student_course = () => {
  const [stucourse, setStucourse] = React.useState([]);
  const [studentDbId, setStudentDbId] = React.useState("");
  const [corseDbID, setCorseDbID] = React.useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/student_courses", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setStucourse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteCourse = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/student_courses/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setStucourse(stucourse.filter((course) => course.id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Navbar />

      <h4 className="text-center m-4">Enroll courses list</h4>
      <div className="container mx-auto">
        <table className="table table-striped ">
          <thead>
            <tr>
              <th className="text-center">Student Db_id </th>
              <th className="text-center">Course id's </th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          {stucourse.map((stucourse) => (
            <tbody>
              <tr key={stucourse.id}>
                <td className="text-center">{stucourse.student_id}</td>
                <td className="text-center">{stucourse.course_id}</td>
                <td className="text-center">
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteCourse(stucourse.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Student_course;
