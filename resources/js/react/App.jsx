import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  useEffect(()=>{
    fetch('/api/prueba')
    .then(respuesta=>respuesta.json())
    .then(resultado=>console.log(resultado))
    .catch(error => console.log(error))
  })

  return (
    <>
    </>
  )
}

export default App
