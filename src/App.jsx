import { Route, Routes } from 'react-router-dom'

import Feedback from '../src/pages/Feedback'
import Home from '../src/pages/Home'

function App() {
  return (
    <div
      className="min-h-screen w-full"
    >
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/feedback' element={<Feedback />} />
      </Routes>
    </div>
  )
}

export default App
