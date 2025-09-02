import React from 'react'
import { NavLink } from 'react-router-dom'

function Home() {
  return (
    <div>
      <NavLink className='text-white' to='/feedback' >Go To Feedback</NavLink>
    </div>
  )
}

export default Home
