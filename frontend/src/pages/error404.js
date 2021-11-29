import React from 'react'
import Navbar from '../component/navBar'

const error = () => {
  return (
    <div>
      <Navbar stop={true}/>
      Pagina no encontrada
    </div>
  )
}

export default error