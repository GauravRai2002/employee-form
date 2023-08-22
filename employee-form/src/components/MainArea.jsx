import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddForm from './AddForm'
import DisplayData from './DisplayData'

function MainArea() {
  return (
    <Routes>
        <Route path='/' element={<AddForm/>}/>
        <Route path='/details' element={<DisplayData/>}/>
    </Routes>
  )
}

export default MainArea