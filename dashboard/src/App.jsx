import React from 'react';
import {BrowserRouter as Router , Routes ,Route} from "react-router-dom"
import Home from '../src/pages/Home.jsx'
import Login from '../src/pages/Login.jsx'
import ForgotPassword from '../src/pages/ForgotPassword.jsx'
import ResetPassword from '../src/pages/ResetPassword.jsx'
import ManageSkills from '../src/pages/ManageSkills.jsx'
import ManageProjects from '../src/pages/ManageProjects.jsx'
import ManageTimeline from '../src/pages/ManageTimeline.jsx'
import ViewProject from '../src/pages/ViewProject.jsx'
import UpdateProject from '../src/pages/UpdateProject.jsx'
import {ToastContainer} from 'react-toastify'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/password/forgot' element={<ForgotPassword/>} />
          <Route path='/password/reset/:token' element={<ResetPassword/>} />
          <Route path='/manage/skills' element={<ManageSkills/>} />
          <Route path='/manage/timelines' element={<ManageTimeline/>} />
          <Route path='/manage/projects' element={<ManageProjects/>} />
          <Route path='/view/project/:id' element={<ViewProject/>} />
          <Route path='/update/project/:id' element={<UpdateProject/>} />
        </Routes>
        <ToastContainer position='bottom-right' theme='colored'/>
      </Router>
    </>
  );
}

export default App;
