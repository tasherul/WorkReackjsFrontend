import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Information = () => {
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [course, setCourse] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        `http://127.0.0.1:8000/api/student_courses/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setData(result.data.student);
      setCourse(result.data.courses);
      console.log(result.data.courses);
    }
    fetchData();
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <p>Name: {data.name}</p>
        <p>Roll No: {data.roll_number} </p>
        <p>Email: {data.email}</p>
        <p>Phone: {data.phone}</p>
        <p>Address: {data.address}</p>
        <p>Father Name: {data.father_name}</p>
        <p>Mother Name: {data.mother_name}</p>
        {course.length > 0 ? (
          <p>Total enrolled course {course.length}</p>
        ) : (
          <p>No course enrolled</p>
        )}
        {course.length > 0 ? (
          course.map((course) => (
            <div>
              <p>
                {course.name} -{course.id}
              </p>
            </div>
          ))
        ) : (
          <p>No Course Found</p>
        )}
      </div>
    </div>
  );
};

export default Information;
