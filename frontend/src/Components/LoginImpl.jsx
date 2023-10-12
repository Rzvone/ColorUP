import React, { useEffect,useState } from "react";
import { useNavigate , Link} from "react-router-dom";

const LoginImpl = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUSers] = useState([]);

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

  const fetchUserData = () => {

    fetch('http://localhost:8080/users/getAllUsers')
      .then(response => {
      return response.json()
      })
      .then(data => {
      setUSers(data)
      })
    console.log(users);
  };

  useEffect(() => {
    fetchUserData()
  }, []);

 
};
export default LoginImpl;
