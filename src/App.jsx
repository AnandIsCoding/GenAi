import { Route, Routes } from 'react-router-dom'

import Feedback from '../src/pages/Feedback'
import Home from '../src/pages/Home'
import ProductRecommendations from './pages/ProductRecommendations'

function App() {
  return (
    <div
      className="min-h-screen w-full"
    >
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/feedback' element={<Feedback />} />
        <Route path='/product-recommendation' element={<ProductRecommendations />} />
      </Routes>
    </div>
  )
}

export default App
