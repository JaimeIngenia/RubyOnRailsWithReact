import React from 'react'
import * as ReactDOM from 'react-dom'
import { useState, useEffect } from 'react'

const ServerSideError = (props) => {
  return(
    <>
     <p className='lead fw-bold'> please fix the errors</p>
     { props.errors.map((error, index) => (
        <p className='text-danger' key={index}>{error} </p>
      )) }
    </>
  )
}

export default ServerSideError
