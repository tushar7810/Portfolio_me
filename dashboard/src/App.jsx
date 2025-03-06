import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Home from './pages/mainPages/Home.jsx'
import LoginPage from './pages/mainPages/Login.jsx'
import ForgotPassword from './pages/mainPages/ForgotPassword.jsx'
import ResetPassword from './pages/mainPages/ResetPassword.jsx'
import Skills from './pages/mainPages/Skills.jsx'
import Timeline from './pages/mainPages/Timeline.jsx'
import Project from './pages/mainPages/Project.jsx'
import ViewProject from './pages/mainPages/ViewProject.jsx'
import UpdateProject from './pages/subComponents/UpdateProject.jsx'
import { ToastContainer } from 'react-toastify';

import './App.css'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getUser } from './store/slices/userSlice.js'
import { getAllMessages } from './store/slices/messaegsSlice.js'
import { getAllProject } from './store/slices/projectSlice.js'
import { getAllSoftware } from './store/slices/softwareSlice.js'
import { getAllTimeline } from './store/slices/timelineSlice.js'
import { getAllSkills } from './store/slices/skillSlice.js'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser())
    dispatch(getAllMessages())
    dispatch(getAllProject())
    dispatch(getAllSoftware())
    dispatch(getAllTimeline())
    dispatch(getAllSkills())
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/password/forgot' element={<ForgotPassword />} />
        <Route path='/password/reset/:token' element={<ResetPassword />} />
        <Route path='/manage/skills' element={<Skills />} />
        <Route path='/manage/projects' element={<Project />} />
        <Route path='/manage/timelines' element={<Timeline />} />
        <Route path='/view/project/:id' element={<ViewProject />} />
        <Route path='/update/project/:id' element={<UpdateProject />} />
      </Routes>
      <ToastContainer position='bottom-right' theme='dark'/>
    </Router>
  )
}

export default App
