import React from 'react';
import '../style/image.css'

const image=({src, text})=>{
    return(
        <div className="container">
            <img className="image" src={src} alt={text} width="1200" height="400"/>
            <div className="text"><h1>{text}</h1></div>
        </div>
    )
}

export default image;