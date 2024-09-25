import React from 'react'
import {useState} from "react"
const Color = () => {
    const [color , setColor] = useState("")

    function pickColor(e){
        setColor(e.target.value)
        console.log(color)
    }

  return (
    <div>
      <h1>Color Picker</h1>
      <div className="result" style={{ backgroundColor: color }}      >{color ? `Picked Color: ${color}` : "Picked Color: #FFF"}</div>
      <h2>Pick here</h2>
      <input type="color" onChange={(e) => pickColor(e)} />
    </div>
  )
}

export default Color
