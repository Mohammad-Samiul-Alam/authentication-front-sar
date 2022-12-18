import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Register from './components/register/Register';
import Home from './components/home/Home';
import Login from './components/login/Login';
import User from './components/user/User';
import Private, { Protect } from './components/private/Private';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ForgotPassword from './components/forgotpassword/ForgotPassword';
import ResetPassword from './components/resetpassword/ResetPassword';

function App() {
  return <>
  <Router>
    <Home/>
    <Routes>
        <Route element={<Private/>}>
          <Route path='/user' element={<User/>} />
        </Route>
        <Route element={<Protect/>}>
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/forgotpassword' element={<ForgotPassword/>} />
          <Route path='/passwordreset/:resetToken' element={<ResetPassword/>} />
        </Route>
    </Routes>
    <ToastContainer />
  </Router>
  </>
}

export default App;
