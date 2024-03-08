import { useRecoilState } from "recoil";
import "./ParagraphGenerator.css"
import { para } from "../store/atoms/paragraph";
// import {color} from "../store/atoms/color"
import { useMemo, useState } from "react";


const DICTIONARY = ["monitor", "program", "application", "keyboard", "javascript", "gaming", "network", "water", "tree", "fire"];
export const ParagraphGenerator = () => {
    const [resltParagraph, setResultParagraph] = useRecoilState(para);
    const [wordsNum, setWordsNum] = useState(0);
    // console.log(resultParagraph)

    const handleGenerateParagraph = () => {
        console.log("handleGenerateParagraph")
        let num = wordsNum;
        let result = "";
        while(num--){
            let index = Math.floor((Math.random()*10));
            console.log(index)
            result = result+DICTIONARY[index]+" ";
        }
        console.log(result)
        setResultParagraph(result);
    }
    return(
        <div id="ParagraphGenerator">
            <div>
                <h1>Para Generator</h1>
            </div>
            <div>
                <input onChange={(e) => {setWordsNum(Number(e.target.value))}} type="text" placeholder="  Enter Number of Words"/>
                <button onClick={()=> {handleGenerateParagraph()}}>Generate</button>
            </div>
            <div><p>{resltParagraph}</p></div>
        </div>
    )
}