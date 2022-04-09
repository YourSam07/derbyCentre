import React from 'react'
import './error.css'
import {FaTimes} from 'react-icons/fa'

function Error({children, color}) {
  const closeErr = () => {
    document.getElementById('wrapper').classList.add('hide')
  }

  return (
      <>
        <div className="errWrapper" id='wrapper' style={{backgroundColor: color}}>
            <div className='errmsg'>{children}</div>
            <div className='closeIcon' onClick={closeErr}>
                <FaTimes size='1.5rem' />
            </div>
        </div>
        
      </>
  )
}

export default Error