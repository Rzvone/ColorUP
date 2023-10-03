import { useState } from 'react';
import {Link} from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')
    
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
       </div>
       Don't have an account?<Link to="/register">Register</Link>
       <div>
         <button  type="submit">
           Login
         </button>
       </div>
     </div>
   );
}
export default Login