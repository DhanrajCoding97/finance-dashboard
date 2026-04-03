import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Button } from "./components/ui/button"
function App() {
  const [count, setCount] = useState(0)

  return (
   <>
   <h1 className='text-2xl text-yellow-400'>Finance Tracker </h1>
   <Button variant="outline" size="lg">Hello</Button>
   </>
  )
}

export default App
