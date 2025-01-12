import React from 'react'
import {useState , useEffect} from "react"
import { MdDelete } from "react-icons/md";
const Color = () => {
    const [color , setColor] = useState("");
    const [eyeDropperColor , setEyeDropperColor] = useState("");
    const [image , setImage] = useState()

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
    function saveColorFunc() {
      setSaveColor((prev) => [
        ...prev,
        {
          id: Math.random(),
          text: color || eyeDropperColor
        },
      ]);
    }
    
    function deleteColor(id){
      const filteredColors = saveColor.filter((col) => col.id !== id)
      setSaveColor(filteredColors)
    }

    function handleFileInput(e){
      setImage(URL.createObjectURL(e.target.files[0]));
    }
    async function openEyeDropper(){
      setColor("")
      let eyeDropper = new EyeDropper();
      const {sRGBHex} = await eyeDropper.open();
        setEyeDropperColor(sRGBHex);
    }
  return (
    <div className="container">
      
      <div className="savedColorContainer">
        {saveColor.length > 0 && <h2>Saved Colors :</h2>}
       {saveColor.map((color) => (
        <div className="boxContainer"> 
        <p>{color.text || color.eyeDropperSavedColor}  </p>
     <div className="box" style={{backgroundColor: color.text}}></div>
     <MdDelete onClick={() => deleteColor(color.id)} className="icon" />
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
        <div>
        <h1>Pick color from image</h1>
          <p>Select an image</p>
          <input onChange={(e) => handleFileInput(e)} type="file" accept="image/*" name="" id="" />
          {image && <img className="input-image" src={image} />}
          <p>2. Pick color</p>
          <button className="eye-dropper-button" onClick={openEyeDropper}>Open Eye Dropper</button>

          <p>3. Picked color</p>
          {eyeDropperColor && 
            <>
              <div className="eyeDropperBox" style={{backgroundColor: eyeDropperColor}} >
              <span>{eyeDropperColor}</span>
              </div>
            <br />
             <button className="saveColorButton" onClick={saveColorFunc}>Save Color</button>
            </>
          }
         
        </div>
          
      
    </div>
  )
}

export default Color
