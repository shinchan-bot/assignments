import React from "react";
import { ReactDOM } from "react";
import "./Card.css";


function Card(props){
    return(
        <div id="Card">
            <h1>{props.title}</h1>
            <p>{props.description}</p>
            <h2>Interests</h2>
            {props?.interests?.map(interest => {
                return <li>{interest}</li>
            })}
            <div id="social">
                <a href={props.linkedIn}>
                    <button>LinkedIn</button>
                </a>
                <a href={props.twitter}>
                    <button>Twitter</button>
                </a>
            </div>
        </div>
    )
}

export default Card;