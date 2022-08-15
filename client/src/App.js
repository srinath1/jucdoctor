import React from 'react'
import { BrowserRouter, Route, Navigate,Routes } from "react-router-dom";

import 'antd/dist/antd.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import DoctorsList from './pages/Admin/DoctorsList'
// import {Toaster}from 'react-hot-toast'
import {useSelector,useDispatch} from 'react-redux'
import ProtectedRoute from './components/ProtectedRoutes';
import ApplyDoctor from './pages/ApplyDoctor';
import Notifications from './pages/Notifications';
import Userslist from './pages/Admin/UsersList';
import Profile from './pages/Doctor/Profile'
import BookAppointment from './pages/BookAppointment'
import Appointments from './pages/Appointments';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';



function App() {
  const {loading}=useSelector(state=>{
    return state.alerts
    
  })
  console.log(loading)
  return (
    <div className="App">
      <BrowserRouter>
     {loading &&  (
      <div className='spinner-parent'>
      <div className="spinner-border" role="status">
</div>
      </div>
     )}
        <Routes>
        <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>} />
        <Route path='/users' element={<ProtectedRoute><Userslist/></ProtectedRoute>} />
        <Route path='/admin/doctorslist' element={<ProtectedRoute><DoctorsList/></ProtectedRoute>} />

        <Route path='/notifications' element={<ProtectedRoute><Notifications/></ProtectedRoute>} />
<Route path='/appointments'element={<ProtectedRoute><Appointments/></ProtectedRoute>}/>
<Route path='/doctor/appointments' element={<ProtectedRoute><DoctorAppointments/></ProtectedRoute>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/doctor/profile/:id' element={<ProtectedRoute> <Profile/></ProtectedRoute>}/>
        <Route path='/book-appointment/:doctorId' element={<ProtectedRoute> <BookAppointment/></ProtectedRoute>}/>

        <Route path='/apply-doctor' element={<ProtectedRoute> <ApplyDoctor/></ProtectedRoute>}/>
             
            
             </Routes>
      </BrowserRouter>
    </div>
  );
}



export default App;





