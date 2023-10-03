import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const onSubmit = () => {
    fetch("http://localhost:8080/api/v1/auth/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({email,password})
    }).then((res) => res.json())
      .then((data) => {
        console.log(data)
        localStorage.setItem('token', data.token);
      }).catch(err => {
        console.log(err);
      })
    setEmail("");
    setPassword("");
    setSuccess(true)
  }

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a>Go to Home</a>
          </p>
        </section>
      ) : (
        <div className="login-wrapper">
          <h2>Please Log In!</h2>
          <form>
            <div>
              <label>Email </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label>Password </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </form>
          Don't have an account?<Link to="/register">Register</Link>
          <div>
            <button onClick={onSubmit} type="submit">
              Login
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default Login;
