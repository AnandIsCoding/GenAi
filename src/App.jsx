import { Route, Routes } from 'react-router-dom'

import Feedback from '../src/pages/Feedback'
import Home from '../src/pages/Home'

function App() {
  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundImage: `url('https://cdn.dribbble.com/userupload/44735735/file/7445b7a6edb4e7b439ac67eefefa126e.jpg?resize=1504x1127&vertical=center')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "brightness(1)", // slightly dimmed for readability
      }}
    >
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/feedback' element={<Feedback />} />
      </Routes>
    </div>
  )
}

export default App
