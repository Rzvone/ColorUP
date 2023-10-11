import { Routes, Route } from 'react-router-dom'
import About from './Components/About';
import Error from './Components/Error';
import NavBar from './Components/NavBar';
import Login from './Pages/Login';
import { themeSettings } from './theme';
import { useSelector } from 'react-redux';
import {createTheme} from '@mui/material/styles'
import { CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import Register from './Pages/Register';
import LoginPage from './Pages/LoginPage';
import ForgotPassword from './Pages/ForgotPassword';
import Profile from './Pages/Profile';
import Contact from './Components/Contact';

function App() {
  const mode = useSelector(state=>state.mode)
  const theme = createTheme(themeSettings(mode))
  
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline/> 
            <NavBar/>
        <Routes> 
              <Route path='/contact' element={<Contact/>} />
              <Route path='/about' element={<About/>} /> 
              <Route path='/error' element={<Error />} />
              <Route path='/register' element={<Register />} />
              <Route path='/authentication' element={<LoginPage />}/>
              <Route path='/forgot-password' element={<ForgotPassword/>}/>
              <Route path='/profile' element={<Profile/>}/>
            </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
