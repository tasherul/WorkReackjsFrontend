import React from "react";
import { StateContext } from "../Components/StateContext";

const Register = () => {
  const { Register } = React.useContext(StateContext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    Register({ email, password, name }).then((res) => {
      if (res.error) {
        alert(res.error);
      } else {
        alert("Registered Successfully");
      }
    });
  };

  return (
    <div
      className="col-md-6 mx-auto"
      style={{
        marginTop: "100px",
      }}
    >
      <h1>Register</h1>
      <form action="/action_page.php">
        <div className="form-group">
          <label htmlFor="name"> Name:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address:</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pwd">Password:</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            id="pwd"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group form-check">
          <label className="form-check-label">
            <input className="form-check-input" type="checkbox" /> Remember me
          </label>
        </div>
        <button type="submit" className="btn btn-primary" onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
