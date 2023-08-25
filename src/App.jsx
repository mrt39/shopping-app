import { useState } from 'react'
import Dashboard from "./components/Dashboard.tsx"
import OffCanvas from "./components/Offcanvas.jsx"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Dashboard/>
    </>
  )
}

export default App
