import React from "react";
import { Link } from "react-router-dom";
import { StateContext } from "../Components/StateContext";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { Login } = React.useContext(StateContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    Login({ email, password });
  };

  return (
    <div
      style={{
        marginTop: "100px",
      }}
      className="col-md-6 mx-auto"
    >
      <h1>Login</h1>
      <form action="/action_page.php">
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
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>

        <Link to="/register">
          <button
            style={{
              marginLeft: "10px",
            }}
            type="button"
            className="btn btn-primary"
          >
            Register
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
