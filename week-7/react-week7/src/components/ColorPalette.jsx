import { useRecoilState } from "recoil";
import {color} from "../store/atoms/color";
import "./ColorPalette.css";

export const ColorPalette = () => {
    const [bgColor, setbgColor]  =  useRecoilState(color);
    console.log(bgColor)
    return (
    <div style={{height:"100vh", background:bgColor, display:"flex", flexWrap:"wrap"}}>
        <div id="ColorPalette" >
            <button onClick={()=> {setbgColor("red")}} style={{background:"Red"}}>Red</button>
            <button onClick={()=> {setbgColor("yellow")}} style={{background:"Yellow"}}>Yellow</button>
            <button onClick={()=> {setbgColor("black")}} style={{background:"Black", color:"white"}}>Black</button>
            <button onClick={()=> {setbgColor("purple")}} style={{background:"Purple"}}>Purple</button>
            <button onClick={()=> {setbgColor("blue")}} style={{background:"Blue"}}>Blue</button>
            <button onClick={()=> {setbgColor("green")}} style={{background:"Green"}}>Green</button>
            <button onClick={()=> {setbgColor("orange")}} style={{background:"Orange"}}>Default</button>

        </div>
    </div>
)}