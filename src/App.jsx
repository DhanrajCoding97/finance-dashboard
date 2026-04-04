import {BrowserRouter , Routes, Route, Navigate} from 'react-router-dom'
import {AppProvider} from './context/AppContext'
import Dashboard from './pages/Dashboard'
import Layout from './components/ui/layout/Layout'
function App() {
  return (
  <AppProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element ={<Navigate to='/dashboard' replace/>}/>
          <Route path ="/dashboard" element={<Dashboard/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </AppProvider>
  )
}

export default App
