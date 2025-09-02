import { Route, Routes } from 'react-router-dom'
import Home from '../src/pages/Home'
import Feedback from '../src/pages/Feedback'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={ <Home/>} />
        <Route path='/feedback' element={ <Feedback/>} />
      </Routes>
    </>
  )
}

export default App
