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

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "firstName") {
      setFirstName(value);
    }
    if (id === "lastName") {
      setLastName(value);
    }
    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
    if (id === "contactNumber") {
      setContactNumber(value);
    }
  };

  const handleSubmit = () => {
    // e.preventDefault()

    const register = { firstName, lastName, email, password, contactNumber }
    
    setIsPending(true);
    fetch('http://localhost:8080/users/postUser', {
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
            onChange={(e) => handleInputChange(e)}
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
            onChange={(e) => handleInputChange(e)}
          />
        </div>
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
        <div>
          <label>Contact Number </label>
          <input
            type="contactNumber"
            id="contactNumber"
            placeholder="Contact Number"
            value={contactNumber}
            onChange={(e) => handleInputChange(e)}
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
