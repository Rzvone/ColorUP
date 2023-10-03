import React, { useState } from "react";
import {useNavigate,Link} from 'react-router-dom'

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [isPending, setIsPending] = useState(false  );

  const navigate = useNavigate();

  const handleSubmit = () => {

    const register = { firstName, lastName, email, password, contactNumber }
    
    setIsPending(true);
    fetch('http://localhost:8080/api/v1/auth/register', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(register)
    }).then(() => {
      console.log("New register added");
      setIsPending(false);
    })
    navigate('/login')
      
  };

  return (
    <div>
      <div>
        <div>
          <label>First Name </label>
          <input
            type="text"
            id="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label>Last Name </label>
          <input
            type="text"
            name=""
            id="lastName"
            placeholder="LastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
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
        <div>
          <label>Contact Number </label>
          <input
            type="contactNumber"
            id="contactNumber"
            placeholder="Contact Number"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />
        </div>
      </div>
      <div>
        Already have an account?<Link to="/login">Login</Link>
      </div>
      <div>
        {!isPending && <button onClick={() => handleSubmit()} type="submit">
          Register
        </button>}
        {isPending && <button disabled>Registrating...</button>}
      </div>
    </div>
  );
};
export default Register;
