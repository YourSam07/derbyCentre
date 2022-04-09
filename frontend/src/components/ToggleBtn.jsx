import React, { useState } from 'react'
import './toggleBtn.css'
import { IoIosMoon, IoIosSunny} from "react-icons/io";

function ToggleBtn({onclick}) {
  const [isdark, setIsdark] = useState(false)

  return (
    <>
        <label className="switch" htmlFor="check">
            <input type="checkbox" id="check" onChange={(e) => {e.target.checked ? setIsdark(true) : setIsdark(false)}}/>
            <span className="slider round" onClick={onclick}>
              <span className="circle">
                {isdark ?  <IoIosSunny /> : <IoIosMoon />}
              </span>
            </span>
        </label>
    </>
  )
}

export default ToggleBtn