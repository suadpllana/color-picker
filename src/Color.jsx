import React from 'react'
import {useState , useEffect} from "react"
const Color = () => {
    const [color , setColor] = useState("");

    const [saveColor , setSaveColor] = useState(() => {
      const savedColors = localStorage.getItem("colorsData");
      return savedColors ? JSON.parse(savedColors)  : []
    });


  
    useEffect(() => {
      localStorage.setItem("colorsData", JSON.stringify(saveColor));
    }, [saveColor]);



    function pickColor(e){
        setColor(e.target.value)
        
    }
    function saveColorFunc(){
      setSaveColor((prev) => [
        ...prev ,
        {
          id: Math.random(),
          text: color
        }
      ])
    }

  return (
    <div className="container">
      
      <div className="savedColorContainer">
        {saveColor.length > 0 && <h2>Saved Colors :</h2>}
       {saveColor.map((color) => (
        <div className="boxContainer"> 
     <p>{color.text}  </p>
     <div className="box" style={{backgroundColor: color.text}}></div>
        </div>
 
        ))}
      </div>
      <div className="colorPickerContainer">
      <h1>Color Picker</h1>
      <div className="result" style={{ backgroundColor: color }} >{color ? `Picked Color: ${color}` : "Picked Color: #FFF"}</div>
      <h2>Pick here</h2>
      <input type="color" onChange={(e) => pickColor(e)} /> <br/>
      {color &&  <button className="saveColorButton" onClick={saveColorFunc}>Save Color</button>}
     
      </div>
    </div>
  )
}

export default Color
