import React, { useState } from "react";
import { useNavigate , Link} from "react-router-dom";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
   
    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
 
  };

  const handleSubmit = () => {
    const login = { email, password };

    navigate("/")

    console.log(login)
  };

  return (
    <div>
      <div>
        <div>
          <label>Email </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div>
          <label>Password </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
     
      </div>
      Don't have an account?<Link to="/register">Register</Link>
      <div>
          <button onClick={() => handleSubmit()} type="submit">
            Login
          </button>
      </div>
    </div>
  );
};
export default Login;
