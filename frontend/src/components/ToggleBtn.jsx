import React, { useContext, useState } from 'react'
import './toggleBtn.css'
import { IoIosMoon, IoIosSunny} from "react-icons/io";
import { ThemeContext } from '../contexts/theme';

function ToggleBtn({onclick}) {
  const [{isDark}] = useContext(ThemeContext)
  const [isdark, setIsdark] = useState(false)

  return (
    <>
        <label className="switch" htmlFor="check">
            <input type="checkbox" id="check" onChange={(e) => {e.target.checked ? setIsdark(true) : setIsdark(false)}}/>
            <span className="slider round" onClick={onclick}>
              <span className="circle" style={isDark ? {transform: `translateX(20px)`} : {transform: `translateX(0px)`}}>
                {isdark ?  <IoIosSunny /> : <IoIosMoon />}
              </span>
            </span>
        </label>
    </>
  )
}

export default ToggleBtn