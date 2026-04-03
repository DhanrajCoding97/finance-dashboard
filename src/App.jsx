import {BrowserRouter , Routes, Route, Navigate} from 'react-router-dom'
import {AppProvider} from './context/AppContext'
import Dashboard from './pages/Dashboard'
function App() {
  return (
  <AppProvider>
    <BrowserRouter>
      <Routes>
        <Route index element ={<Navigate to='/dashboard' replace/>}/>
        <Route path ="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  </AppProvider>
  )
}

export default App
