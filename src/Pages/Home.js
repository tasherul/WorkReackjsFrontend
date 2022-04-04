import React, { useState } from "react";
import { StateContext } from "../Components/StateContext";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const { students, deleteStudent, setStudents } =
    React.useContext(StateContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [father_name, setFatherName] = useState("");
  const [mother_name, setMotherName] = useState("");
  const [roll_number, setRollNumber] = useState("");

  const [updateName, setUpdateName] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updatePhone, setUpdatePhone] = useState("");
  const [updateAddress, setUpdateAddress] = useState("");
  const [updateFatherName, setUpdateFatherName] = useState("");
  const [updateMotherName, setUpdateMotherName] = useState("");
  const [updateRollNumber, setUpdateRollNumber] = useState("");

  const addStudent = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://127.0.0.1:8000/api/students",
        {
          name,
          email,
          phone,
          address,
          father_name,
          mother_name,
          roll_number,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setStudents([...students, res.data]);
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setFatherName("");
        setMotherName("");
        setRollNumber("");
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Students</h1>
        <div>
          <button
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#exampleModalCenter"
          >
            Add Student
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
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">
                    Add Student
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
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Roll Number</label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      placeholder="Enter phone"
                      value={roll_number}
                      onChange={(e) => setRollNumber(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      placeholder="Enter phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="Enter address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="father_name">Father Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="father_name"
                      placeholder="Enter father name"
                      value={father_name}
                      onChange={(e) => setFatherName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="mother_name">Mother Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="mother_name"
                      placeholder="Enter mother name"
                      value={mother_name}
                      onChange={(e) => setMotherName(e.target.value)}
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
                    onClick={addStudent}
                  >
                    Add Student
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Roll</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index}>
                  <th scope="row">{student.id}</th>
                  <th scope="row">{student.roll_number}</th>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td className="container">
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteStudent(student.id)}
                    >
                      Delete
                    </button>
                    <Link to={`/information/${student.id}`}>
                      <button className="btn btn-primary">Info</button>
                    </Link>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-toggle="modal"
                      data-target="#second"
                    >
                      Edit Student
                    </button>
                    <div>
                      {/* Modal */}
                      <div
                        className="modal fade"
                        id="second"
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
                                update
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
                                <label htmlFor="name">Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="name"
                                  placeholder="Enter name"
                                  value={updateName}
                                  onChange={(e) =>
                                    setUpdateName(e.target.value)
                                  }
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                  type="email"
                                  className="form-control"
                                  id="email"
                                  placeholder="Enter email"
                                  value={updateEmail}
                                  onChange={(e) =>
                                    setUpdateEmail(e.target.value)
                                  }
                                />
                              </div>

                              <div className="form-group">
                                <label htmlFor="phone">Roll Number</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="phone"
                                  placeholder="Enter phone"
                                  value={updateRollNumber}
                                  onChange={(e) =>
                                    setUpdateRollNumber(e.target.value)
                                  }
                                />
                              </div>

                              <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="phone"
                                  placeholder="Enter phone"
                                  value={updatePhone}
                                  onChange={(e) =>
                                    setUpdatePhone(e.target.value)
                                  }
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="address"
                                  placeholder="Enter address"
                                  value={updateAddress}
                                  onChange={(e) =>
                                    setUpdateAddress(e.target.value)
                                  }
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="father_name">Father Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="father_name"
                                  placeholder="Enter father name"
                                  value={updateFatherName}
                                  onChange={(e) =>
                                    setUpdateFatherName(e.target.value)
                                  }
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="mother_name">Mother Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="mother_name"
                                  placeholder="Enter mother name"
                                  value={updateMotherName}
                                  onChange={(e) =>
                                    setUpdateMotherName(e.target.value)
                                  }
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
                                      `http://127.0.0.1:8000/api/students/${student.id}`,
                                      {
                                        name: updateName,
                                        email: updateEmail,
                                        roll_number: updateRollNumber,
                                        phone: updatePhone,
                                        address: updateAddress,
                                        father_name: updateFatherName,
                                        mother_name: updateMotherName,
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
                                      console.log(res);
                                      setUpdateName("");
                                      setUpdateEmail("");
                                      setUpdateRollNumber("");
                                      setUpdatePhone("");
                                      setUpdateAddress("");
                                      setUpdateFatherName("");
                                      setUpdateMotherName("");

                                      setStudents(
                                        students.map((student) => {
                                          if (student.id === res.data.id) {
                                            return res.data;
                                          } else {
                                            return student;
                                          }
                                        })
                                      );
                                    })
                                    .catch((err) => {
                                      console.log(err);
                                    });
                                }}
                              >
                                Edit
                              </button>
                            </div>
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
    </div>
  );
};

export default Home;
