import { Routes, Route } from 'react-router-dom'
import About from './Components/About';
import Error from './Components/Error';
import NavBar from './Components/NavBar';

import Register from './Pages/Register';

function App() {
  
  return (
    <div>
      <NavBar/>
      <Routes> 
        <Route path='/about' element={<About/>} /> 
        <Route path='/error' element={<Error />} />
        <Route path='/register' element={<Register/>}/>
    </Routes>
    </div>
  );
}

export default App;
