import { useRef, useState } from "react";
import { Link ,useNavigate} from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  const [errMsg, setErrMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const onSubmit = () => {
    fetch("http://localhost:8080/api/v1/auth/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("token", data.token);
      })
      .catch((err) => {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
          setErrMsg("Missing Username or Password");
        } else if (err.response?.status === 401) {
          setErrMsg("Unauthorized");
        } else {
          setErrMsg("Login failed");
        }
      });
    setEmail("");
    setPassword("");
    setSuccess(true);
    // navigate('/about')
  };

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
                required
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
                required
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
