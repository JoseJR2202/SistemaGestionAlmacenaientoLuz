import React from 'react';
import '../style/pdf.css';

const pdf=({url, name})=>{
   
    return(
        <div>
            <object className='pdfview' type="application/pdf" data={url}>{name}</object>
        </div>
    )
}

export default pdf;