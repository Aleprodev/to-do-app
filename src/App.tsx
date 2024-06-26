import { useRef, useState } from 'react'
import { Button } from '@mui/material'
import { gsap } from "gsap";
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const buttonRef = useRef(null);

  return (
    <>
      <div className="card">
        <Button ref={buttonRef} onClick={() => {
          gsap.to(buttonRef.current, { rotation: 360, duration: 1, ease: "power2.inOut" })
          setCount((count) => count + 1)
        }} variant="contained">
          count is {count}
        </Button>
      </div>
    </>
  )
}

export default App
