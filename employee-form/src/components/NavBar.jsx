import React from 'react'
import { Link } from 'react-router-dom'
import MainArea from './MainArea'

function Demo() {
  return (<>    <div className='flex items-center justify-center gap-8 py-4'>
    <Link to='/'><button className="btn btn-outline btn-accent"> Add Employee</button></Link>
    <Link to='/details'><button className="btn btn-outline btn-accent"> View Employee Data </button></Link>
  </div>
    <MainArea />
  </>

  )
}

export default Demo