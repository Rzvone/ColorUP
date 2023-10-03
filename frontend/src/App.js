import { Routes, Route } from 'react-router-dom'
import About from './Components/About';
import Error from './Components/Error';
import NavBar from './Components/NavBar';
import Login from './Pages/Login';

import Register from './Pages/Register';

function App() {
  
  return (
    <div>
      <NavBar/>
      <Routes> 
        <Route path='/about' element={<About/>} /> 
        <Route path='/error' element={<Error />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />}/>
    </Routes>
    </div>
  );
}

export default App;
