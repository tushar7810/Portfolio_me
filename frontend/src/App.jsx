import './App.css'
import { ThemeProvider } from './components/theme-provider'
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom'
import Footer from './pages/Footer'
import Home from './pages/Home'
import ProjectView from './pages/Projects'
import { ToastContainer } from 'react-toastify';
import Resume from './pages/subComponents/Resume'

function App() {

  return (
    <>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/project/:id' element={<ProjectView />} />
            <Route path='/resume' element={ <Resume />}/>
          </Routes>
          <Footer/>
          <ToastContainer position='bottom-right' theme='dark'/>
        </Router>
      </ThemeProvider>
    </>
  )
}

export default App
